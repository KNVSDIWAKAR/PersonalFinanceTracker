const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  receiverName: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Completed" },
  date: { type: String, required: true },
  mode: { type: String, required: true },
  note: { type: String },
  type: { type: String, default: "debit" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
