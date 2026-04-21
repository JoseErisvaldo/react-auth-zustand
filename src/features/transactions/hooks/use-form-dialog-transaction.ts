import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostTransaction } from "../mutations/use-create-transaction-dialog";
import { createTransactionSchema } from "../schema/transaction.schema";
import type { TransactionDTO } from "../types/transaction.types";

type ApiError = {
  message?: string;
};

const defaultValues: Partial<TransactionDTO> = {
  type: "income",
  category: "",
  title: "",
};

type UseDialogTransactionOptions = {
  onSubmitSuccess?: () => void;
};

export function useDialogTransaction(options?: UseDialogTransactionOptions) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<TransactionDTO>({
    defaultValues,
    resolver: zodResolver(createTransactionSchema),
  });

  const { mutate, isPending, isError, error, reset } = usePostTransaction();

  const submissionErrorMessage =
    (axios.isAxiosError<ApiError>(error)
      ? error.response?.data?.message
      : undefined) ??
    error?.message ??
    "Nao foi possivel enviar a transacao. Tente novamente.";

  const onSubmit = (data: TransactionDTO) => {
    mutate(data, {
      onSuccess: () => {
        resetForm();
        options?.onSubmitSuccess?.();
      },
    });
  };

  return {
    register,
    errors,
    isPending,
    isError,
    submissionErrorMessage,
    resetSubmissionState: reset,
    resetForm,
    handleFormSubmit: handleSubmit(onSubmit),
  };
}
