const Transaction = require("../models/transactionModel");

// GET /api/dashboard/summary
const getDashboardSummary = async (req, res) => {
  try {
    // Fetch all transactions
    const transactions = await Transaction.find();

    // 1. Total expenses
    const totalExpenses = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);

    // 2. Category-wise breakdown
    const categoryBreakdown = {};
    transactions.forEach((txn) => {
      const category = txn.category || "Uncategorized";
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + (txn.amount || 0);
    });

    // 3. Recent 5 transactions
    const recentTransactions = await Transaction.find().sort({ date: -1 }).limit(5);

    // Send response
    res.status(200).json({
      totalExpenses,
      categoryBreakdown,
      recentTransactions,
    });
  } catch (err) {
    console.error(" Failed to generate dashboard summary:", err);
    res.status(500).json({ message: "Dashboard summary failed", error: err.message });
  }
};

// ✅ Proper export
module.exports = { getDashboardSummary };
