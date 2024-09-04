import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DashBoard from "./DashBoard";
import {
  deleteItem,
  getItemData,
  getTodosList,
} from "../../services/DashBoard.services";
import { SampleItemType } from "./interface";

jest.mock("../../services/DashBoard.services", () => {
  return {
    getTodosList: jest.fn(),
    deleteItem: jest.fn(),
    getItemData: jest.fn(),
  };
});

const mockDataList: SampleItemType[] = [
  { userId: 1, id: 1, title: "delectus aut autem", completed: false },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  { userId: 1, id: 3, title: "fugiat veniam minus", completed: false },
  { userId: 1, id: 4, title: "et porro tempora", completed: true },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
];

const mockSelectedItem: SampleItemType = {
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false,
};

describe("DashBoard", () => {
  beforeEach(() => {
    (getTodosList as jest.Mock).mockResolvedValue(mockDataList);
    (getItemData as jest.Mock).mockResolvedValue(mockSelectedItem);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders list items after data fetch", async () => {
    render(<DashBoard />);

    expect(screen.getByTestId("loadingId")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loadingId")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      mockDataList.forEach((item) => {
        expect(screen.getByTestId(`list-item-${item.id}`)).toBeInTheDocument();
      });
    });
  });

  test("displays error when fetching list data fails", async () => {
    (getTodosList as jest.Mock).mockRejectedValue(
      new Error("Failed to load data")
    );

    render(<DashBoard />);

    await waitFor(() => {
      expect(screen.getByTestId("errorId")).toBeInTheDocument();
    });
  });

  test("handles item selection and displays item details", async () => {
    render(<DashBoard />);

    const selectedItem = await screen.findByTestId(
      `list-item-${mockSelectedItem.id}`
    );

    fireEvent.click(selectedItem);

    await waitFor(() => {
      expect(screen.getByTestId("titleId")).toBeInTheDocument();
    });
  });

  test("handles item deletion", async () => {
    render(<DashBoard />);

    const itemToBeDeleted = await screen.findByTestId(
      `delete-btn-${mockSelectedItem.id}`
    );

    fireEvent.click(itemToBeDeleted);
    await waitFor(() => {
      expect(
        screen.queryByTestId(`delete-btn-${mockSelectedItem.id}`)
      ).not.toBeInTheDocument();
    });
  });

  test("handles errors during item deletion", async () => {
    render(<DashBoard />);

    (deleteItem as jest.Mock).mockRejectedValue(
      new Error("Failed to delete item.")
    );

    const itemToBeDeleted = await screen.findByTestId(
      `delete-btn-${mockSelectedItem.id}`
    );

    fireEvent.click(itemToBeDeleted);

    await waitFor(() => {
      expect(screen.getByTestId("errorId")).toBeInTheDocument();
    });

    expect(screen.getByTestId("errorId").textContent).toBe(
      "Failed to delete item."
    );
  });

  test("handles error during item selection", async () => {
    render(<DashBoard />);

    (getItemData as jest.Mock).mockRejectedValue(
      new Error("Failed in fetching selected item data.")
    );

    const selectedItem = await screen.findByTestId(
      `list-item-${mockSelectedItem.id}`
    );
    fireEvent.click(selectedItem);

    await waitFor(() => {
      expect(screen.getByTestId("errorId")).toBeInTheDocument();
    });

    expect(screen.getByTestId("errorId").textContent).toBe(
      "Failed in fetching selected item data."
    );
  });
});
