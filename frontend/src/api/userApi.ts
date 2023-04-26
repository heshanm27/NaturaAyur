import apiClient from "./axios";

export const fetchAllUsers = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchUser = async (id: string) => {
  try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
