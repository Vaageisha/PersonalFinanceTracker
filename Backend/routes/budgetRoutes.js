const express = require("express");
const router = express.Router();
const { addBudget, getBudgets } = require("../controllers/budgetController");


router.post("/", addBudget);


router.get("/", getBudgets);

module.exports = router;
