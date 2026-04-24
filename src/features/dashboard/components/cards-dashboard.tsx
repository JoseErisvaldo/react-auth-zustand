import { ErrorPages } from "@/components/layout/error-pages/error-pages";
import { FeatureBoundary } from "@/components/layout/feature-boundary/feature-boundary";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionsSkeleton } from "@/features/transactions/components/transactions-skeleton";
import useTransactionsHooks from "@/features/transactions/queries/use-transactions-hooks";

function CardsDashboard() {
  const { data } = useTransactionsHooks();
  const transactions = data?.items ?? [];
  const pagination = data?.pagination;

  const totalTransactions = pagination?.totalItems ?? transactions.length;
  const totalAmount = transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount || 0),
    0,
  );
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total de transações</CardDescription>
            <CardTitle className="text-3xl">{totalTransactions}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Volume movimentado</CardDescription>
            <CardTitle className="text-3xl text-green-900">
              R$ {totalAmount.toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Status da sessão</CardDescription>
            <CardTitle className="text-3xl">Ativa</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export function CardsDashboardView() {
  return (
    <FeatureBoundary
      fallback={<TransactionsSkeleton />}
      errorFallback={ErrorPages}
    >
      <CardsDashboard />
    </FeatureBoundary>
  );
}
