const express = require("express")
const morgan = require("morgan")
const expressValidator = require("express-validator")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const {
  getExpanse,
  createExpense,
  findByName,
  deleteExpense,
  updateExpense,
  totalSumOfExpenses,
  incomeAmmount,
  postIncomeAmmount,
} = require("./controller")
const { expenseValidator, incomeValidator } = require("./validator/index")
const bodyParser = require("body-parser")
const ConnectDB = require("./config/db")

//MONGODB CONNECTIONS
ConnectDB()

app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(expressValidator())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})
//Routes for apis
app.get("/", getExpanse)
app.get("/income", incomeAmmount)
app.post("/addExpense", expenseValidator, createExpense)
app.get("/totalexpenses", totalSumOfExpenses)
app.post("/addincome", incomeValidator, postIncomeAmmount)
app.post("/filter", findByName)
app.delete("/:id", deleteExpense)
app.put("/:id", expenseValidator, updateExpense)
//Server Port
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
//MONGO Error Handler
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
