const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
  getMonthlyExpenses,
   getCategoryExpenses,
} = require("../controllers/transactionController");

router.post("/", createTransaction);
router.get("/", getTransaction);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);
router.get("/monthly", getMonthlyExpenses);
router.get("/dashboard/category-expenses", getCategoryExpenses);


module.exports = router;
