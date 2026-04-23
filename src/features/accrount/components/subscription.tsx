import { Badge } from "@/components/ui/badge";
import { StateMessage } from "@/components/ui/state-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "../queries/use-account";

function formatDate(value: string | number | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("pt-BR");
}

export default function Subscriptions() {
  const { data, isLoading, isError } = useSubscription();

  if (isLoading) {
    return (
      <StateMessage
        variant="loading"
        title="Carregando assinatura"
        description="Estamos buscando os dados da sua assinatura."
      />
    );
  }

  if (isError) {
    return (
      <StateMessage
        variant="error"
        title="Erro ao carregar assinatura"
        description="Nao foi possivel buscar os dados da assinatura."
      />
    );
  }

  if (!data?.subscription) {
    return (
      <StateMessage
        title="Sem assinatura ativa"
        description="Voce ainda nao possui uma assinatura vinculada a conta."
      />
    );
  }

  const { subscription } = data;

  return (
    <Card className="border-green-900/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg">Assinatura</CardTitle>
          <Badge className="bg-green-900 text-white hover:bg-green-800">
            {subscription.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>ID:</strong> {subscription.id}
        </p>
        <p>
          <strong>Customer:</strong> {subscription.customerId}
        </p>
        <p>
          <strong>Preco:</strong>{" "}
          {subscription.price?.unitAmount != null
            ? `${(subscription.price.unitAmount / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: subscription.price.currency?.toUpperCase() ?? "BRL",
              })} / ${subscription.price.interval}`
            : "-"}
        </p>
        <p>
          <strong>Inicio do periodo:</strong>{" "}
          {formatDate(subscription.currentPeriodStart)}
        </p>
        <p>
          <strong>Fim do periodo:</strong>{" "}
          {formatDate(subscription.currentPeriodEnd)}
        </p>
        <p>
          <strong>Cancela no fim do periodo:</strong>{" "}
          {subscription.cancelAtPeriodEnd ? "Sim" : "Nao"}
        </p>
      </CardContent>
    </Card>
  );
}
