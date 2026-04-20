import { api } from "../../../shared/api/api";
import { getTransactionsResponseSchema } from "../schema/transaction.schema";
import type {
  GetTransactionsParams,
  GetTransactionsResponse,
  TransactionsList,
} from "../types/transaction.types";

const initialParams: GetTransactionsParams = {
  page: 1,
  limit: 10,
};

export default async function getTransactionsService(
  params: GetTransactionsParams = {},
): Promise<TransactionsList> {
  const response = await api.get<GetTransactionsResponse>("/transactions", {
    params: {
      page: params.page ?? initialParams.page,
      limit: params.limit ?? initialParams.limit,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    },
  });

  const parsedResponse = getTransactionsResponseSchema.parse(response.data);

  return parsedResponse.data;
}
