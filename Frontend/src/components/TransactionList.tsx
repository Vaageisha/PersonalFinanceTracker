"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transactions.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteTransaction(id);
      setTransactions(transactions.filter(txn => txn._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete transaction.");
    }
  };

  const handleEdit = (txn: Transaction) => {
    setEditingId(txn._id);
    setEditForm({ ...txn });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const updated = await api.updateTransaction(editingId, {
        ...editForm,
        amount: parseFloat(editForm.amount?.toString() || "0"),

      });
      setTransactions(transactions.map(txn => (txn._id === editingId ? updated : txn)));
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error(err);
      setError("Failed to update transaction.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">All Transactions</h2>

      {transactions.map(txn => (
        <Card key={txn._id}>
          <CardContent className="p-4 flex justify-between items-center">
            {editingId === txn._id ? (
              <div className="w-full space-y-2">
                <Input name="description" value={editForm.description || ""} onChange={handleEditChange} />
                <Input name="amount" type="number" value={editForm.amount?.toString() || ""} onChange={handleEditChange} />
                <Input name="category" value={editForm.category || ""} onChange={handleEditChange} />
                <Input name="date" type="date" value={editForm.date?.slice(0, 10) || ""} onChange={handleEditChange} />
                <div className="flex gap-2 mt-2">
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-medium">{txn.description}</p>
                  <p className="text-sm text-gray-600">
                    ₹{txn.amount} — {txn.category} — {new Date(txn.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEdit(txn)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(txn._id)}>Delete</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
