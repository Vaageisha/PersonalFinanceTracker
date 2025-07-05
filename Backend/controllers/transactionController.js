const Transaction = require("../models/transactionModel");

// CREATE a transaction
const createTransaction = async (req, res) => {
  console.log(" Incoming transaction data:", req.body);

  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    console.error(" Mongoose validation or DB error:", error);
    res.status(500).json({ error: "Failed to create transaction", details: error.message });
  }
};


// GET all transactions
const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};


// DELETE a transaction
const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};

// UPDATE a transaction
const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// ✅ GET monthly expenses
const getMonthlyExpenses = async (req, res) => {
  try {
    const expenses = await Transaction.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch monthly expenses" });
  }
};

// GET category-wise expenses (for budget comparison)
const getCategoryExpenses = async (req, res) => {
  try {
    const expenses = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalSpent: 1,
        },
      },
    ]);

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Failed to get category expenses:", error);
    res.status(500).json({ error: "Failed to fetch category expenses" });
  }
};





//
module.exports = {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  getMonthlyExpenses,
  getCategoryExpenses, 
};
