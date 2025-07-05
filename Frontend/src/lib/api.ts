import { Transaction } from "@/types/transaction";
import { DashboardSummary } from "@/types/summary";

const API_BASE = "http://localhost:5000/api";

const api = {
  // ✅ Add a transaction with better error handling
  addTransaction: async (data: Omit<Transaction, "_id">): Promise<Transaction> => {
    try {
      // console.log("Sending transaction to backend:", data); // Uncomment for debugging

      const res = await fetch(`${API_BASE}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        // console.error("Backend responded with error:", errorText); // Uncomment for debugging
        throw new Error(`Failed to add transaction: ${errorText}`);
      }

      const json = await res.json();
      // console.log("Received from backend:", json); // Uncomment for debugging
      return json;
    } catch (error) {
      console.error("❌ Error in addTransaction:", error);
      throw error;
    }
  },

  // ✅ Edit a transaction (alternate name for update)
  editTransaction: async (id: string, data: Transaction) => {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update transaction");
    return res.json();
  },

  // ✅ Fetch all transactions
  getTransactions: async (): Promise<Transaction[]> => {
    const res = await fetch(`${API_BASE}/transactions`);
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return res.json();
  },

  // ✅ Delete a transaction
  deleteTransaction: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete transaction");
    return res.json();
  },

  // ✅ Update a transaction (redundant if editTransaction exists)
  updateTransaction: async (id: string, data: Partial<Transaction>) => {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update transaction");
    return res.json();
  },

  // ✅ Monthly expenses
  getMonthlyExpenses: async (): Promise<{ month: string; total: number }[]> => {
    const res = await fetch(`${API_BASE}/transactions/monthly`);
    if (!res.ok) throw new Error("Failed to fetch monthly expenses");
    return res.json();
  },

  // ✅ Budget APIs
  addBudget: async (data: { category: string; amount: number }) => {
    const res = await fetch(`${API_BASE}/budgets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to set budget");
    return res.json();
  },

  getBudgets: async () => {
    const res = await fetch(`${API_BASE}/budgets`);
    if (!res.ok) throw new Error("Failed to fetch budgets");
    return res.json();
  },

  getBudgetSummary: async (): Promise<
    { category: string; budget: number; spent: number }[]
  > => {
    const res = await fetch(`${API_BASE}/budgets/summary`);
    if (!res.ok) throw new Error("Failed to fetch budget summary");
    return res.json();
  },

  // ✅ Dashboard summary
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    const res = await fetch(`${API_BASE}/dashboard/summary`);
    if (!res.ok) throw new Error("Failed to fetch dashboard summary");
    return res.json();
  },

  // ✅ Get category-wise expense breakdown (used for chart)
  getCategoryExpenses: async (): Promise<{ category: string; totalSpent: number }[]> => {
    const res = await fetch(`${API_BASE}/transactions/dashboard/category-expenses`);
    if (!res.ok) throw new Error("Failed to fetch category expenses");
    return res.json();
  },
};

export default api;
