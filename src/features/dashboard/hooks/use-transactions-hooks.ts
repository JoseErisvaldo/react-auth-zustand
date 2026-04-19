import { useQuery } from "@tanstack/react-query";
import getTransactionsService from "../service/get-transactions.service";

export default function useTransactionsHooks() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsService,
  });
}
