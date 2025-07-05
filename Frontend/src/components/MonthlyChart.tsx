"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function MonthlyChart() {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getMonthlyExpenses();
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load monthly data.");
      }
    };

    fetchData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
