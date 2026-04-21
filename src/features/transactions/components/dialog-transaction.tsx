import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialogTransaction } from "../hooks/use-form-dialog-transaction";

export function DialogCreateTransaction() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleFormSubmit,
    errors,
    isPending,
    isError,
    submissionErrorMessage,
    resetSubmissionState,
    resetForm,
  } = useDialogTransaction({
    onSubmitSuccess: () => {
      setOpen(false);
      resetSubmissionState();
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetSubmissionState();
      resetForm();
    }

    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button className="bg-green-600 hover:bg-green-700" />}
      >
        Nova Transação
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Nova Transação</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova transação.
            </DialogDescription>
          </DialogHeader>

          {isError && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submissionErrorMessage}
            </p>
          )}

          <FieldGroup>
            <Field>
              <Label htmlFor="type">Tipo</Label>
              <select
                id="type"
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? "type-error" : undefined}
                {...register("type")}
              >
                <option value="income">Entrada</option>
                <option value="expense">Saída</option>
              </select>
              <FieldError id="type-error">{errors.type?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="category">Categoria</Label>
              <Input
                {...register("category")}
                id="category"
                placeholder="Ex: Alimentação"
                aria-invalid={!!errors.category}
                aria-describedby={
                  errors.category ? "category-error" : undefined
                }
              />
              <FieldError id="category-error">
                {errors.category?.message}
              </FieldError>
            </Field>

            <Field>
              <Label htmlFor="title">Nome</Label>
              <Input
                {...register("title")}
                id="title"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              <FieldError id="title-error">{errors.title?.message}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="amount">Valor</Label>
              <Input
                {...register("amount", {
                  valueAsNumber: true,
                })}
                id="amount"
                type="number"
                step="0.01"
                min="0"
                aria-invalid={!!errors.amount}
                aria-describedby={errors.amount ? "amount-error" : undefined}
              />
              <FieldError id="amount-error">
                {errors.amount?.message}
              </FieldError>
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose
              render={
                <Button variant="outline" className="bg-red-600 text-white" />
              }
            >
              Cancelar
            </DialogClose>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
