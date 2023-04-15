import apiClient from "./axios";

export const fetchAllLiverOrders = async () => {
  try {
    const response = await apiClient.get("/liverOrder");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
