"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "@/lib/api";
import { Transaction } from "@/types/transaction";

type MonthlyData = {
  month: string;
  total: number;
};

export default function MonthlyBarChart() {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const transactions: Transaction[] = await api.getTransactions();

      const grouped: Record<string, number> = {};
      transactions.forEach((txn) => {
        const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" });
        grouped[month] = (grouped[month] || 0) + txn.amount;
      });

      const formatted = Object.entries(grouped).map(([month, total]) => ({ month, total }));
      setData(formatted);
    } catch (err) {
      setError("Failed to load chart");
      console.error(err);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
