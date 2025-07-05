const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const analyticsRoutes = require("./routes/analytics");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Mounting
app.use("/api/analytics", analyticsRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes); // ✅ this too


// DB Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected successfully");
    app.listen(process.env.PORT || 5000, () =>
      console.log(` Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error(" MongoDB connection failed:", err));
