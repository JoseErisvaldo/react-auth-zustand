import { api } from "@/shared/api/api";
import type { getProductsResponse } from "../types/subscription-products.type";
import { getProductsResponseSchema } from "../schema/subscripton-products.schema";

export const SubscriptionProductsService =
  async (): Promise<getProductsResponse> => {
    try {
      const response = await api.get("/billing/catalog/products");
      const parsed = getProductsResponseSchema.parse(response.data);
      return parsed;
    } catch {
      throw new Error("Erro no servidor!!");
    }
  };
