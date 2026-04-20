import { z } from "zod";

export const createTransactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    message: "Selecione o tipo da transação",
  }),
  category: z
    .string()
    .min(2, "A categoria é obrigatória e deve conter mais de 2 caracteres"),
  title: z
    .string()
    .min(
      2,
      "O nome da transação é obrigatório e deve conter mais de 2 caracteres",
    ),
  amount: z
    .number({
      message: "O valor deve ser um número",
    })
    .min(2, "O valor deve ser maior que zero"),
});

export const transactionSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.string().transform((val) => Number(val)),
  type: z.enum(["income", "expense"]),
  category: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const transactionsPaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
});

export const getTransactionsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(transactionSchema),
    pagination: transactionsPaginationSchema,
  }),
});

export const postTransactionResponseSchema = z.object({
  success: z.boolean(),
  data: transactionSchema,
});
