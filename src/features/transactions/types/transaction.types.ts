import { z } from "zod";
import {
  createTransactionSchema,
  getTransactionsResponseSchema,
  transactionsPaginationSchema,
  transactionSchema,
  postTransactionResponseSchema,
} from "../schema/transaction.schema";

export type TransactionDTO = z.infer<typeof createTransactionSchema>;

export type Transaction = z.infer<typeof transactionSchema>;

export type GetTransactionsResponse = z.infer<
  typeof getTransactionsResponseSchema
>;

export type TransactionsPagination = z.infer<
  typeof transactionsPaginationSchema
>;

export type TransactionsList = {
  items: Transaction[];
  pagination: TransactionsPagination;
};

export type PostTransactionResponse = z.infer<
  typeof postTransactionResponseSchema
>;
