import apiClient from "./axios";

export interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string[];
  images: File[];
  stock: number;
}

export const fetchAllProducts = async () => {
  try {
    const response = await apiClient.get("/product");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addProduct = async (value: Product) => {
  try {
    const valuesArray = value.subCategory.map((obj: any) => obj.value);
    const { category, description, name, price, stock, images } = value;
    const response = await apiClient.post(
      "/product",
      {
        category,
        description,
        name,
        price,
        stock,
        images,
        valuesArray,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateProduct = async (id: string, value: Product) => {
  try {
    const response = await apiClient.put(`/product/${id}`, value);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await apiClient.delete(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
