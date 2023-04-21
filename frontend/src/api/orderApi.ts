import apiClient from "./axios";

export const addOrder = async (data: any) => {
  try {
    const response = await apiClient.post("/order", data);
    window.location.href = response.data.url;
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
