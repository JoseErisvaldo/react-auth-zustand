import type {
  PostTransactionResponse,
  TransactionDTO,
} from "../types/transaction.types";
import { postTransactionResponseSchema } from "../schema/transaction.schema";
import { api } from "@/shared/api/api";

export const postTransaction = async (
  data: TransactionDTO,
): Promise<PostTransactionResponse> => {
  const response = await api.post("/transactions", data);

  const parsedResponse = postTransactionResponseSchema.parse(response.data);

  return parsedResponse;
};
