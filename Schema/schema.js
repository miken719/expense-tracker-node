const mongoose = require("mongoose")
const expenseSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: "Price Is Required",
  },
  title: {
    type: String,
    required: "Title Is Required",
    minLength: 2,
    maxLength: 50,
  },
  date: {
    type: Date,
  },
})
module.exports = mongoose.model("Expense", expenseSchema)
