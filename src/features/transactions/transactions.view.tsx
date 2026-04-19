import TableTransactions from "./components/table-transactions";

export default function Transactions() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Transações</h1>
      <p className="text-lg text-gray-600">Bem vindo!</p>

      <div className="mt-8">
        <TableTransactions />
      </div>
    </div>
  );
}
