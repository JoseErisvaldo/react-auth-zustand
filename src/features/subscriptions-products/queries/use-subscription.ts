import { useQuery } from "@tanstack/react-query";
import { SubscriptionProductsService } from "../service/subscription-products.service";

export const useSubscriptonProducts = () => {
  return useQuery({
    queryKey: ["subscriptonProducts"],
    queryFn: SubscriptionProductsService,
  });
};
