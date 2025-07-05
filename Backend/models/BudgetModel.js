const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
      lowercase: true, 
    unique: true,  
  },
  amount: {
    type: Number,
    required: true,
  },
  // optional: to associate with a user in future
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
