import type {
  PostTransactionResponse,
  TransactionDTO,
} from "../types/transaction.types";
import {
  createTransactionSchema,
  postTransactionResponseSchema,
} from "../schema/transaction.schema";
import { api } from "@/shared/api/api";

export const postTransaction = async (
  data: TransactionDTO,
): Promise<PostTransactionResponse> => {
  const parsedInput = createTransactionSchema.parse(data);

  const response = await api.post("/transactions", parsedInput);

  const parsedResponse = postTransactionResponseSchema.parse(response.data);

  return parsedResponse;
};
