import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StateMessageProps = {
  title: string;
  description: string;
  variant?: "loading" | "empty" | "error";
};

const badgeLabels = {
  loading: "Carregando",
  empty: "Sem dados",
  error: "Erro",
};

export function StateMessage({
  title,
  description,
  variant = "empty",
}: StateMessageProps) {
  return (
    <Card className="border-dashed">
      <CardHeader className="items-start gap-3">
        <Badge
          className={cn(
            "text-white",
            variant === "error"
              ? "bg-red-700 hover:bg-red-700"
              : "bg-green-900 hover:bg-green-900",
          )}
        >
          {badgeLabels[variant]}
        </Badge>
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div
            className={cn(
              "h-1.5 rounded-full",
              variant === "error" ? "w-1/3 bg-red-700" : "w-2/3 bg-green-900",
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
