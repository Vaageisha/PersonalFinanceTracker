"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Transaction } from "@/types/transaction";

export default function TransactionForm({ onAdd }: { onAdd?: (t: Transaction) => void }) {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { amount, date, description } = formData;

    if (!amount || !date || !description) {
      setError("Amount, date, and description are required.");
      return;
    }

    try {
      const newTransaction = await api.addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });

      if (onAdd) onAdd(newTransaction); // for live updating list

      // reset form
      setFormData({ amount: "", date: "", description: "", category: "" });
    } catch (err) {
      setError("Failed to add transaction.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      <Input
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        type="number"
      />
      <Input
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
        type="date"
      />
      <Input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <Input
        name="category"
        placeholder="Category (optional)"
        value={formData.category}
        onChange={handleChange}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full">
        Add
      </Button>
    </form>
  );
}
