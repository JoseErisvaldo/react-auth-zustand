import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Account from "./components/account";
import Subscriptions from "./components/subscription";

export default function Accrount() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Card className="border-green-900/10 shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge className="w-fit bg-green-900 text-white hover:bg-green-800">
              Conta
            </Badge>
            <div>
              <CardTitle className="text-2xl">Minha Conta</CardTitle>
              <CardDescription>
                Visualize e gerencie suas informações pessoais.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Account />
          <Subscriptions />
        </CardContent>
      </Card>
    </section>
  );
}
