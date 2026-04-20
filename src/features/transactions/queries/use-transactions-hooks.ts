import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getTransactionsService from "../service/get-transactions.service";
import type { GetTransactionsParams } from "../types/transaction.types";

export default function useTransactionsHooks(
  params: GetTransactionsParams = {},
) {
  return useQuery({
    queryKey: ["transactions", params.page ?? 1, params.limit ?? 10],
    queryFn: () => getTransactionsService(params),
    placeholderData: keepPreviousData, // controla o que mostrar na UI enquanto busca os dados, mantendo os dados anteriores para evitar "piscar" a UI
    staleTime: 30 * 1000, // aqui torna os dados "frescos" por 30 segundos, evitando chamadas desnecessárias ao backend
  });
}
