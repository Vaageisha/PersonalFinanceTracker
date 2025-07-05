import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

import CategoryPieChart from "@/components/CategoryPieChart";

export default function Home() {
  return (
    <main className="p-6">
      <TransactionForm />
      <TransactionList />
   
      <CategoryPieChart />
    </main>
  );
}
