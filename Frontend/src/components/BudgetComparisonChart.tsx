// BudgetComparisonChart.tsx

"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Budget {
  category: string;
  amount: number;
}

interface Expense {
  category: string;
  totalSpent: number; // must match what you're using in BudgetPage
}

interface Props {
  budgets: Budget[];
  expenses: Expense[];
}

export default function BudgetComparisonChart({ budgets, expenses }: Props) {
  const [data, setData] = useState<
    { category: string; Budget: number; Spent: number }[]
  >([]);

  useEffect(() => {
    const combined = budgets.map((budget) => {
      const expense = expenses.find((e) => e.category === budget.category);
      return {
        category: budget.category,
        Budget: budget.amount,
        Spent: expense?.totalSpent || 0, // match this field!
      };
    });

    setData(combined);
  }, [budgets, expenses]);

  return (
    <div className="w-full h-[300px] mt-8">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" />
          <Bar dataKey="Spent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
