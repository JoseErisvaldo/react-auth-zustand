import { api } from "../../../shared/api/api";

type Transaction = {
  id: number;
  title: string;
  amount: string;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

type TransactionsApiResponse =
  | Transaction[]
  | { data?: Transaction[]; transactions?: Transaction[] };

export default async function getTransactionsService(): Promise<Transaction[]> {
  const response = await api.get<TransactionsApiResponse>("/transactions");
  const payload = response.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.data ?? payload.transactions ?? [];
}
