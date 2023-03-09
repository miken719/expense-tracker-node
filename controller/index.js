const Expense = require("../Schema/schema");
const ObjectId = require("mongoose").Types.ObjectId;
const Income = require("../Schema/incomeSchema");
//Get API
exports.getExpanse = (req, res) => {
  let query = req.query.sort;

  Expense.find()
    .select("_id price title date")
    .sort(query)
    .then((result) => {
      res.status(200).json({ expenses: result });
    })
    .catch((err) => console.log(err));
};

//POST API
exports.createExpense = (req, res) => {
  let expense = new Expense({ ...req.body, date: new Date() });

  expense.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.status(200).json({
      status: 1,
      expense: result,
      message: "Expense Added Successfully",
    });
  });
};
//DELETE API
exports.deleteExpense = (req, res) => {
  let { id } = req.params;

  Expense.deleteOne({ _id: id })
    .then(
      res
        .status(200)
        .json({ status: 1, message: `Expenese Removed Successfully` })
    )
    .catch((err) =>
      res.status(400).json({ status: 0, message: `Something Went Wrong` })
    );
};
// FILTER API
exports.findByName = (req, res) => {
  let { search } = req.body;

  Expense.find({
    title: { $regex: search, $options: "i" },
  })
    .then((result) => res.status(200).json({ expenses: result }))
    .catch((err) => console.log(err));
};
//UPDATE API
exports.updateExpense = async (req, res) => {
  let { id } = req.params;
  let { price, title } = req.body;

  try {
    await Expense.findByIdAndUpdate(
      { _id: ObjectId(id) },
      { $set: { price: price, title: title } },
      { new: true, upsert: true }
    ).then((result) =>
      res.status(200).json({
        expenses: result,
        status: 1,
        message: "Expense Update Successfully",
      })
    );
  } catch (error) {
    console.log({ error });
  }
};
//SUM OF TOTAL API
exports.totalSumOfExpenses = async (req, res) => {
  try {
    //For Loop for sum of income array
    const income = await Income.find({})
      .select("income")
      .then((result) => result.map((i) => i?.income));
    let incomeSum = 0;
    let arrayIncome = income;
    for (const element of arrayIncome) {
      incomeSum += element;
    }
    //For Loop for sum of expense array
    const findPrice = await Expense.find()
      .select("price")
      .then((result) => result.map((i) => i?.price));
    let array = findPrice;
    let sum = 0;
    for (const element of array) {
      sum += element;
    }
    //Expanse Total Balance
    let expanse = incomeSum;
    expanse -= sum;
    res.status(200).json({
      total: { sum: sum, income: incomeSum, balance: expanse },
      status: 1,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.incomeAmmount = (req, res) => {
  Income.find({})
    .select("income")
    .then((result) => res.status(200).json({ income: result }));
};

exports.postIncomeAmmount = (req, res) => {
  let income = new Income({ ...req.body, date: new Date() });
  income.save((err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    res.status(200).json({
      status: 1,
      message: "Income Added Successfully",
      income: result,
    });
  });
};
