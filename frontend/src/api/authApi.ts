import apiClient from "./axios";

interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: string;
    city: string;
    provience: string;
    postalCode: string;
  };
  avatar?: File | null;
  phoneno: string;
  password: string;
  confirmPassword: string;
}

export const SignUpApiCall = async (data: SignUpValues) => {
  console.log("apicall", data);
  try {
    const response = await apiClient.post("/auth/signUp", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
