import Dashboard from "@/components/Dashboard";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import BudgetInput from "@/components/BudgetInput";

export default function DashboardPage() {
  return (
    <>
      <Dashboard />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
        <MonthlyBarChart />
      </div>
      <BudgetInput />
    </>
  );
}