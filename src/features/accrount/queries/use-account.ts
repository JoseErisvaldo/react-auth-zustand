import { useQuery } from "@tanstack/react-query";
import {
  getAccrountService,
  getSubscriptionsService,
} from "../service/get-account.service";

export const useAccrount = () => {
  return useQuery({
    queryKey: ["accrount"],
    queryFn: getAccrountService,
  });
};

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscriptionsService,
  });
};
