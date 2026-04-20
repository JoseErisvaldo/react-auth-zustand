import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StateMessage } from "@/components/ui/state-message";
import useTransactionsHooks from "../transactions/queries/use-transactions-hooks";

export default function Dashboard() {
  const { data, isLoading, isError } = useTransactionsHooks();
  const transactions = data?.items ?? [];
  const pagination = data?.pagination;

  const totalTransactions = pagination?.totalItems ?? transactions.length;
  const totalAmount = transactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount || 0),
    0,
  );

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Card className="border-green-900/10 shadow-sm">
        <CardHeader className="space-y-2">
          <Badge className="w-fit bg-green-900 text-white hover:bg-green-800">
            Visão geral
          </Badge>
          <div>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
            <CardDescription>
              Acompanhe rapidamente o resumo financeiro da sua conta.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
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

          {isLoading && (
            <StateMessage
              variant="loading"
              title="Atualizando dados do painel"
              description="As informações financeiras estão sendo carregadas agora."
            />
          )}

          {isError && (
            <StateMessage
              variant="error"
              title="Falha ao carregar o dashboard"
              description="Não foi possível buscar o resumo financeiro neste momento."
            />
          )}

          {!isLoading && !isError && transactions.length === 0 && (
            <StateMessage
              variant="empty"
              title="Nenhuma movimentação encontrada"
              description="Assim que houver transações, o resumo aparecerá aqui."
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
