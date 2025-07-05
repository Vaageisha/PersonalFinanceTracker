const Transaction = require("../models/transactionModel");

exports.getMonthlyExpenses = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const monthlyTotals = {};

    transactions.forEach(txn => {
      const date = new Date(txn.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      monthlyTotals[month] = (monthlyTotals[month] || 0) + txn.amount;
    });

    const result = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch monthly data" });
  }
};
