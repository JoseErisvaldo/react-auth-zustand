import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../service/post-transactions.service";
import type {
  PostTransactionResponse,
  TransactionDTO,
} from "../types/transaction.types";

export function usePostTransaction() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    PostTransactionResponse,
    Error,
    TransactionDTO,
    unknown
  >({
    mutationFn: postTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: false,
      });
    },
  });

  return mutation;
}
