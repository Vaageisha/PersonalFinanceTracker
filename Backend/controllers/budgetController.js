const Budget = require("../models/BudgetModel");
const Transaction = require("../models/transactionModel");

const addBudget = async (req, res) => {
  const category = req.body.category.toLowerCase();

  try {
    // 🔍 Check if budget for this category already exists
    const existing = await Budget.findOne({ category });

    if (existing) {
      return res.status(400).json({ error: "Budget for this category already exists." });
    }

    // Create new budget
    const budget = await Budget.create({
      category,
      amount: Number(req.body.amount),
    });

    res.status(201).json(budget);
  } catch (error) {
    console.error(" Budget creation error:", error);
    res.status(500).json({ error: "Failed to set budget" });
  }
};


const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
};

const getBudgetSummary = async (req, res) => {
  try {
    const budgets = await Budget.find({});
    const transactions = await Transaction.find({});

    const spendingByCategory = {};

    transactions.forEach(txn => {
      const month = new Date(txn.date).getMonth();
      const currentMonth = new Date().getMonth();
      if (month === currentMonth) {
        if (!spendingByCategory[txn.category]) {
          spendingByCategory[txn.category] = 0;
        }
        spendingByCategory[txn.category] += txn.amount;
      }
    });

    const summary = budgets.map(b => ({
      category: b.category,
      budget: b.amount,
      spent: spendingByCategory[b.category] || 0
    }));

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch budget summary" });
  }
};

module.exports = {

  getBudgetSummary,
  addBudget,
  getBudgets
};