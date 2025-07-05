"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";

interface Budget {
  category: string;
  amount: number;
}

interface Expense {
  category: string;
  totalSpent: number; // ✅ Must match backend field
}

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState<Budget>({ category: "", amount: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await api.getBudgets();
      setBudgets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch budgets.");
    }
  };

  const fetchExpenses = async () => {
    try {
      const data = await api.getCategoryExpenses(); // ✅ Make sure this returns totalSpent
      setExpenses(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch expenses.");
    }
  };

  const handleAddBudget = async () => {
    try {
      await api.addBudget(form);
      setForm({ category: "", amount: 0 });
      fetchBudgets();
    } catch (err) {
      console.error(err);
      setError("Failed to add budget.");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Set Your Monthly Budgets</h1>

      {/* Budget Form */}
      <div className="flex gap-4">
        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: parseFloat(e.target.value) || 0 })
          }
        />
        <Button onClick={handleAddBudget}>Add Budget</Button>
      </div>

      {/* Show All Budgets */}
      <div className="space-y-3">
        {budgets.map((budget, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 flex justify-between items-center">
              <span>{budget.category}</span>
              <span className="font-medium">₹{budget.amount}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget vs Spent Chart */}
      <BudgetComparisonChart budgets={budgets} expenses={expenses} />
{/* Spending Insights */}
<div className="mt-6 space-y-2">
  <h2 className="text-xl font-semibold mb-2">Spending Insights</h2>

  {budgets.map((budget) => {
    const expense = expenses.find((e) => e.category === budget.category);
    const spent = expense?.totalSpent || 0;

    if (spent > budget.amount) {
      return (
        <p key={budget.category} className="text-red-600">
          ⚠️ You exceeded your <strong>{budget.category}</strong> budget by ₹{spent - budget.amount}.
        </p>
      );
    } else {
      return (
        <p key={budget.category} className="text-green-700">
          ✅ You are within your <strong>{budget.category}</strong> budget. ₹{budget.amount - spent} remaining.
        </p>
      );
    }
  })}

  {/* For expenses that have no budget set */}
  {expenses
    .filter((e) => !budgets.find((b) => b.category === e.category))
    .map((e) => (
      <p key={e.category} className="text-yellow-600">
        You spent ₹{e.totalSpent} on <strong>{e.category}</strong> but haven’t set a budget for it.
      </p>
    ))}
</div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
