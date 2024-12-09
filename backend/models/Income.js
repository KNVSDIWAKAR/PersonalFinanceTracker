const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  senderName: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash", "card", "bankTransfer", "upi"],
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },
  note: {
    type: String,
    default: "",
  },
  category: { type: String, required: true },
  status: {
    type: String,
    default: "Completed",
    enum: ["Completed", "Pending"],
  },
  type: { type: String, default: "credit" },
});

module.exports = mongoose.model("Income", incomeSchema);
