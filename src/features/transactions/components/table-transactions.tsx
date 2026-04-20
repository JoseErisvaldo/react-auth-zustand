import { Badge } from "@/components/ui/badge";
import { StateMessage } from "@/components/ui/state-message";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTransactionsHooks from "../queries/use-transactions-hooks";

export default function TableTransactions() {
  const { data, isLoading, isError } = useTransactionsHooks();
  const transactions = data?.items ?? [];
  const pagination = data?.pagination;

  if (isLoading) {
    return (
      <StateMessage
        variant="loading"
        title="Carregando transações"
        description="Estamos buscando suas movimentações mais recentes."
      />
    );
  }

  if (isError) {
    return (
      <StateMessage
        variant="error"
        title="Erro ao carregar transações"
        description="Não foi possível consultar a lista neste momento."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Histórico recente</h2>
          <p className="text-sm text-muted-foreground">
            Consulte as movimentações mais recentes da sua conta.
          </p>
        </div>

        <Badge variant="secondary">
          {pagination?.totalItems ?? transactions.length} itens
        </Badge>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-4">
                  <StateMessage
                    variant="empty"
                    title="Nenhuma transação encontrada"
                    description="Adicione uma nova movimentação para começar a visualizar seus dados aqui."
                  />
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    #{transaction.id}
                  </TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell className="font-semibold text-green-900">
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <p className="text-sm text-muted-foreground">
          Pagina {pagination.page} de {pagination.totalPages}.
        </p>
      )}
    </div>
  );
}
