import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTransaction } from "../service/post-transactions.service";
import { useState } from "react";
import { ZodError } from "zod";

export function usePostTransaction() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postTransaction,

    onSuccess: () => {
      setErrors({});
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.issues.forEach((err) => {
          const field = err.path[0];
          if (field && typeof field === "string")
            fieldErrors[field] = err.message;
        });

        setErrors(fieldErrors);
      }
    },
  });
  return { ...mutation, errors, setErrors };
}
