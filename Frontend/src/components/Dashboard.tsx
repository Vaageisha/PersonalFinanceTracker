"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { DashboardSummary } from "@/types/summary";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await api.getDashboardSummary();
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard summary.");
      }
    };

    fetchSummary();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!summary) return <p className="text-gray-500">Loading...</p>;

  const pieData = Object.entries(summary.categoryBreakdown).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-10 max-w-4xl mx-auto">
      {/* Total Expense */}
      <Card>
        <CardContent className="text-xl font-bold p-6">
          Total Expenses: ₹{summary.totalExpenses}
        </CardContent>
      </Card>

      {/* Category-wise Pie Chart */}
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Category Breakdown</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-3">
          {summary.recentTransactions.map((txn) => (
            <li key={txn._id} className="p-3 border rounded-lg shadow-sm">
              <span className="font-medium">₹{txn.amount}</span> — {txn.description} on{" "}
              <span className="text-gray-600">{new Date(txn.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
