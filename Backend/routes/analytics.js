const express = require("express");
const router = express.Router();
const { getMonthlyExpenses } = require("../controllers/analyticsController");

router.get("/monthly", getMonthlyExpenses);



module.exports = router;
