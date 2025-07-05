"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BudgetInput() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage(""); // Clear previous message

    if (!category || !amount) {
      setMessage(" Please fill in both category and amount.");
      return;
    }

    try {
      // Send request to backend
      await api.addBudget({
        category: category.trim(),
        amount: parseFloat(amount),
      });

      setMessage(" Budget set successfully!");
      setCategory("");
      setAmount("");
    } catch (err) {
      console.error("Error adding budget:", err);

      const msg = err instanceof Error && err.message?.includes("already exists")
        ? " Budget for this category already exists."
        : " Failed to set budget. Please try again.";

      setMessage(msg);
    }
  };

  return (
    <div className="space-y-4 mt-10 max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold">Set Budget</h2>

      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button onClick={handleSubmit} className="w-full">
        Set Budget
      </Button>

      {message && (
        <p
          className={`text-sm ${
            message.startsWith("✅")
              ? "text-green-600"
              : message.startsWith("❗")
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
