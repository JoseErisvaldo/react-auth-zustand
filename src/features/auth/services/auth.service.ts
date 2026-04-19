import { api } from "../../../shared/api/api";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    refreshExpiresIn: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
};

export const loginService = async (data: LoginPayload) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", data);
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  } finally {
    console.log("Login attempt completed");
  }
};
