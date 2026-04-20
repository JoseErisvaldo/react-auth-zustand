import { api } from "../../../shared/api/api";
import { getTransactionsResponseSchema } from "../schema/transaction.schema";
import type {
  GetTransactionsResponse,
  TransactionsList,
} from "../types/transaction.types";

export default async function getTransactionsService(): Promise<TransactionsList> {
  const response = await api.get<GetTransactionsResponse>("/transactions", {
    params: {
      page: 1,
      limit: 10,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    },
  });

  const parsedResponse = getTransactionsResponseSchema.parse(response.data);

  return parsedResponse.data;
}
