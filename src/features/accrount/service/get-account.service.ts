import { api } from "@/shared/api/api";
import type {
  SubscriptionsResponse,
  AccrountResponse,
} from "../types/account.types";

export const getAccrountService = async () => {
  const response = await api.get<AccrountResponse>("/users/me");
  return response.data.data;
};

export const getSubscriptionsService = async () => {
  const response = await api.get<SubscriptionsResponse>(
    "/billing/subscriptions/me",
  );
  return response.data.data;
};
