import type z from "zod";
import type {
  getProductsResponseSchema,
  priceResponseSchema,
  productResponseSchema,
} from "../schema/subscripton-products.schema";

export type Product = z.infer<typeof productResponseSchema>;
export type Price = z.infer<typeof priceResponseSchema>;
export type getProductsResponse = z.infer<typeof getProductsResponseSchema>;
