import useTransactionsHooks from "../hooks/use-transactions-hooks";

type Transaction = {
  id: number;
  title: string;
  amount: string;
  type: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export default function TableTransactions() {
  const { data = [] } = useTransactionsHooks();

  return (
    <div className="w-full max-w-4xl rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Transactions
          </h2>
          <p className="text-sm text-slate-500">Recent transaction history</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          {data.length} items
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden rounded-2xl">
          <thead>
            <tr className="bg-slate-100 text-left text-sm uppercase tracking-wide text-slate-600">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction: Transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium text-slate-700">
                  #{transaction.id}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {transaction.title}
                </td>
                <td className="px-4 py-3 font-semibold text-emerald-600">
                  {transaction.amount}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {transaction.category}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
