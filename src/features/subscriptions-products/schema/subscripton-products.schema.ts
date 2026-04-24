import { z } from "zod";

export const priceResponseSchema = z.object({
  id: z.string(),
  productId: z.string(),
  active: z.boolean(),
  currency: z.string(),
  type: z.string(),
  unitAmount: z.number(),
  interval: z.string(),
  intervalCount: z.number(),
  trialPeriodDays: z.number(),
  nickname: z.string().nullable(),
  metadata: z.record(z.string(), z.any()),
});

export const productResponseSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  metadata: z.record(z.string(), z.any()),
  prices: z.array(priceResponseSchema),
});

export const getProductsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(productResponseSchema),
});
