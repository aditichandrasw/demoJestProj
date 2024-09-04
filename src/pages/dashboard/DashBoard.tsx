import { useEffect, useState } from "react";
import "./DashBoard.css";
import { SampleItemType } from "./interface";
import {
  deleteItem,
  getItemData,
  getTodosList,
} from "../../services/DashBoard.services";
import SelectedItem from "../../components/SelectedItem/SelectedItem";

const DashBoard = () => {
  const [listData, setListData] = useState<SampleItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedItemData, setSelectedItemData] = useState<SampleItemType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteItem = async (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    try {
      await deleteItem(id);
      const newListData = listData.filter((el: any) => el.id !== id);
      setListData(newListData);
    } catch (error) {
      setError("Failed to delete item.");
      console.error(`error in deleting ${id}= `, error);
    }
  };

  const handleSelectItem = async (id: number) => {
    setSelectedItem(id);
    try {
      const itemData = await getItemData(id);
      setSelectedItemData(itemData);
    } catch (error) {
      console.log("error in fetching item data", error);
      setError("Failed in fetching selected item data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getTodosList();
        console.log("result=", result);
        setListData(result);
      } catch (error) {
        // console.error("error in getting list data= ", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // try
  // catch
  // 2 types - sync async 
  // sync -> type/ compiltation/ exceptions  ? undefined/ NAN //
  // async -> api calls -> try catch -> .then().catch()
  //

  return (
    <div className="dashboard-container">
      {loading ? (
        <div data-testid="loadingId">Loading...</div>
      ) : error ? (
        <div data-testid="errorId">{error}</div>
      ) : (
        <div className="list-and-details">
          <ul className="list">
            {listData.map((el: SampleItemType) => {
              return (
                <li
                  key={el.id}
                  className={`list-item ${
                    selectedItem === el.id ? "selected-item" : ""
                  }`}
                  onClick={() => handleSelectItem(el.id)}
                  data-testid={`list-item-${el.id}`}
                >
                  {el.title}
                  <button
                    className="delete-button"
                    onClick={(e) =>
                      handleDeleteItem(el.id, e)
                    }
                    data-testid={`delete-btn-${el.id}`}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
          {selectedItem
            ? selectedItemData && (
                <SelectedItem selectedItemData={selectedItemData} />
              )
            : null}
        </div>
      )}
    </div>
  );
};

export default DashBoard;