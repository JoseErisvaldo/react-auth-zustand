import { api } from "@/shared/api/api";
import type { AccrountResponse } from "../types/account.types";

export const getAccrountService = async () => {
  const response = await api.get<AccrountResponse>("/users/me");
  return response.data.data;
};
