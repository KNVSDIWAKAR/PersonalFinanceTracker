const Income = require("../models/Income.js");
const User = require("../models/user.js");

async function createIncomeFunction(req, res) {
  const {
    username,
    senderName,
    paymentMethod,
    amount,
    date,
    note,
    status,
    category,
  } = req.body;

  // Validation
  if (!senderName || !paymentMethod || !amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newIncome = new Income({
      username,
      senderName,
      paymentMethod,
      amount,
      date: date || new Date().toLocaleDateString(),
      note,
      status,
      category,
    });

    const savedIncome = await newIncome.save();

    const user = await User.findOne({ username });
    if (user) {
      user.balance += Number(amount); // Add amount to balance
      user.income += Number(amount); // Add amount to income

      await user.save(); // Save updated user document
    } else {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(201).json({
      message: "Income transaction saved successfully!",
      data: savedIncome,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again." });
  }
}

async function showIncomeFunction(req, res) {
  try {
    const incomes = await Income.find();
    res.status(200).json({
      message: "Incomes fetched successfully",
      data: incomes,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again." });
  }
}

async function dataforChartFunction(req, res) {
  const { username } = req.params;

  try {
    // Fetch records where type is 'credit'
    const records = await Income.find({ username, type: "credit" });

    // Group records by category and calculate sum of amounts
    const categorySum = records.reduce((acc, record) => {
      if (record.category) {
        if (!acc[record.category]) {
          acc[record.category] = 0;
        }
        acc[record.category] += record.amount;
      }
      return acc;
    }, {});

    // Send the filtered records and category-wise sum
    res.json({
      records,
      categorySum,
    });
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createIncomeFunction,
  showIncomeFunction,
  dataforChartFunction,
};
