import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscriptonProducts } from "../queries/use-subscription";

export default function SubscriptionProducts() {
  const { data, isLoading } = useSubscriptonProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Nenhum plano encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Controle seu dinheiro 💰</h1>

        <p className="text-muted-foreground mb-8">
          Simples, rápido e inteligente
        </p>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((product) => {
            const price = product.prices[0];

            const formattedPrice = (price.unitAmount / 100).toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: price.currency.toUpperCase(),
              },
            );

            return (
              <Card key={product.id} className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold">{formattedPrice}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {price.interval === "month" ? "mês" : price.interval}
                    </span>
                  </div>

                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✔ Controle financeiro completo</li>
                    <li>✔ Relatórios inteligentes</li>
                    <li>✔ Acesso ilimitado</li>
                  </ul>

                  <Button className="w-full">Assinar plano</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Comece agora</h2>

        <Button size="lg">Criar conta</Button>
      </section>
    </div>
  );
}
