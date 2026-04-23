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

const progressClassByVariant = {
  loading: "w-2/3 bg-green-900",
  empty: "w-full bg-slate-400",
  error: "w-full bg-red-700",
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
              : variant === "loading"
                ? "bg-green-900 hover:bg-green-900"
                : "bg-slate-500 hover:bg-slate-500",
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
              progressClassByVariant[variant],
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
