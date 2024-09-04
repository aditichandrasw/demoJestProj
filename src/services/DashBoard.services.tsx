import axios from "axios";
import { SampleItemType } from "../pages/dashboard/interface";

export const BASE_URL = "https://jsonplaceholder.typicode.com";

export const API_ENDPOINTS = {
  TO_DOS_LIST: "/todos",
  POSTS: "/posts",
};

export const getTodosList = async (): Promise<SampleItemType[]> => {
  const { data } = await axios.get<SampleItemType[]>(
    `${BASE_URL}${API_ENDPOINTS.TO_DOS_LIST}`
  );
  return data;
};

export const deleteItem = async (id: number): Promise<number> => {
  const { data } = await axios.delete<number>(
    `${BASE_URL}${API_ENDPOINTS.POSTS}/${id}`
  );
  return data;
};

export const getItemData = async (id:number): Promise<SampleItemType> =>{
  const {data} = await axios.get<SampleItemType>(
    `${BASE_URL}${API_ENDPOINTS.POSTS}/${id}`
  )
  return data;
}
