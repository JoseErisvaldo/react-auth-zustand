import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardsDashboardView } from "./components/cards-dashboard";

export default function Dashboard() {
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

        <CardContent>
          <CardsDashboardView />
        </CardContent>
      </Card>
    </section>
  );
}
