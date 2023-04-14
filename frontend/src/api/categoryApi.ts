import apiClient from "./axios";

export const fetchAllCategories = async () => {
  try {
    const response = await apiClient.get("/category");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
