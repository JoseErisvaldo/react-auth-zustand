"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw, AlertTriangle } from "lucide-react";

type GlobalErrorProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function GlobalError({
  title = "Algo deu errado",
  description = "Não foi possível carregar os dados. Tente novamente.",
  onRetry,
}: GlobalErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
        <AlertTriangle className="h-8 w-8 text-red-600" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onRetry}
          className="flex items-center gap-2 bg-green-600"
        >
          <RefreshCcw className="h-4 w-4" />
          Tentar novamente
        </Button>

        <Button variant="ghost" onClick={() => window.location.reload()}>
          Recarregar página
        </Button>
      </div>
    </div>
  );
}
