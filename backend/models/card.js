const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    bankName: { type: String, required: true },
    cardHolder: { type: String, required: true },
    cardType: {
      type: String,
      enum: ["Debit Card", "Credit Card"],
      required: true,
    },
    paymentNetwork: {
      type: String,
      enum: ["Visa", "MasterCard", "RuPay"],
      required: true,
    },
    cardNumber: { type: String, required: true, unique: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
