const mongoose = require("mongoose")
const IncomeShema = new mongoose.Schema({
  income: {
    type: Number,
    require: "Income Is Required",
  },
  date: {
    type: Date,
  },
})
module.exports = mongoose.model("Income", IncomeShema)
