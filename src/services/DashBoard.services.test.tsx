import axios from "axios";
import { SampleItemType } from "../pages/dashboard/interface";
import { API_ENDPOINTS, BASE_URL, deleteItem, getItemData, getTodosList } from "./DashBoard.services";

jest.mock('axios'); //telling Jest to mock axios globally.
const mockedAxios = axios as jest.Mocked<typeof axios>; // ensuring TypeScript recognizes that axios is now a mocked version, 
// providing type safety and autocompletion for mock-related methods.

const mockDataList: SampleItemType[] = [
    { completed: false, id: 1, title: "delectus aut autem", userId: 1 },
    {
      completed: false,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      userId: 1,
    },
  ];
  
  const mockSelectedItem: SampleItemType = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  };

  describe('Dashboard services test cases',()=>{

    afterEach(()=>{
        jest.clearAllMocks()
    })

    test('api which gets all the list items',async ()=>{
        mockedAxios.get.mockResolvedValue({data:mockDataList})

        const result = await getTodosList();

        expect(result).toEqual([
            { completed: false, id: 1, title: "delectus aut autem", userId: 1 },
            {
              completed: false,
              id: 2,
              title: "quis ut nam facilis et officia qui",
              userId: 1,
            },
        ]);
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}${API_ENDPOINTS.TO_DOS_LIST}`)
    })

    test('api to render error messge on failure of getting to do lists data',async()=>{
        mockedAxios.get.mockRejectedValue(new Error('Failed to load data'));
        await expect(getTodosList()).rejects.toThrow('Failed to load data');
    })

    test('api to get data for selected item',async()=>{
        mockedAxios.get.mockResolvedValue({data:mockSelectedItem});

        const result = await getItemData(mockSelectedItem.id)

        expect(result).toEqual({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
        })

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}${API_ENDPOINTS.POSTS}/${mockSelectedItem.id}`)
    })

    test('api to render error on failure of getting data for a selected item',async()=>{
        mockedAxios.get.mockRejectedValue(new Error('Failed in fetching selected item data.'));

        await expect(getItemData(mockSelectedItem.id)).rejects.toThrow('Failed in fetching selected item data.');
    })

    test('api to delete a selected item',async()=>{
        mockedAxios.delete.mockResolvedValue({data:{}})

        const result  = await deleteItem(mockSelectedItem.id);

        expect(result).toEqual({})
        expect(mockedAxios.delete).toHaveBeenCalledTimes(1)
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${BASE_URL}${API_ENDPOINTS.POSTS}/${mockSelectedItem.id}`)
    })

    test('api to render error on failure of deleting a selected item',async ()=>{
        mockedAxios.delete.mockRejectedValue(new Error(`error in deleting ${mockSelectedItem.id}=`))

        await expect(deleteItem(mockSelectedItem.id)).rejects.toThrow(`error in deleting ${mockSelectedItem.id}=`)
    })

  })
