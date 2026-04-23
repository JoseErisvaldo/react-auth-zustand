import { StateMessage } from "@/components/ui/state-message";
import { useAccrount } from "../queries/use-account";

export default function Account() {
  const { data, isLoading, isError } = useAccrount();

  return (
    <>
      {isLoading && (
        <StateMessage
          variant="loading"
          title="Carregando conta"
          description="Estamos buscando seus dados pessoais."
        />
      )}

      {isError && (
        <StateMessage
          variant="error"
          title="Erro ao carregar conta"
          description=""
        />
      )}

      {!isLoading && !isError && (
        <div className="space-y-2 text-sm">
          <p>
            <strong>Nome:</strong> {data?.name ?? "-"}
          </p>
          <p>
            <strong>Email:</strong> {data?.email ?? "-"}
          </p>
          <p>
            <strong>ID:</strong> {data?.id ?? "-"}
          </p>
          <p>
            <strong>Criado em:</strong>{" "}
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString("pt-BR")
              : "-"}
          </p>
        </div>
      )}
    </>
  );
}
