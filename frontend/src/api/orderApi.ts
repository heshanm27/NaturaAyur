import apiClient from "./axios";
import store from "../redux/store";
import { placedOrder } from "../redux/orderslice";

export const addOrder = async (data: any) => {
  try {
    const response = await apiClient.post("/order", data);
    store.dispatch(placedOrder(response.data.orderId));
    window.location.href = response.data.url;
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await apiClient.delete(`/order/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
