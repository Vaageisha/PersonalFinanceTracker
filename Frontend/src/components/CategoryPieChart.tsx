"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "@/lib/api";
import { Transaction } from "@/types/transaction";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28", "#d0ed57"];

type CategoryData = {
  name: string;
  value: number;
};

export default function CategoryPieChart() {
  const [data, setData] = useState<CategoryData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const transactions: Transaction[] = await api.getTransactions();

      const breakdown: Record<string, number> = {};
      transactions.forEach((txn) => {
        const category = txn.category || "Uncategorized";
        breakdown[category] = (breakdown[category] || 0) + txn.amount;
      });

      const formatted = Object.entries(breakdown).map(([name, value]) => ({ name, value }));
      setData(formatted);
    } catch (err) {
      console.error("Failed to load pie chart data", err);
      setError("Failed to load chart");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
