exports.expenseValidator = (req, res, next) => {
  req.check("price", "Price is Required").notEmpty()
  req.check("price", "Price must be in numeric").isNumeric()
  req.check("title", "Title is Required").notEmpty()
  req.check("title", "Title is must between 2 to 15 Characters").isLength({
    min: 2,
    max: 50,
  })
  const error = req.validationErrors()
  if (error) {
    let errors = error.map((err) => err.msg)[0]
    return res.status(400).json({ error: errors })
  }
  next()
}
exports.incomeValidator = (req, res, next) => {
  req.check("income", "Income is required").notEmpty()
  req.check("income", "Income is must be in numeric").isNumeric()
  const error = req.validationErrors()
  if (error) {
    let errors = error.map((err) => err.msg)[0]
    return res.status(400).json({ error: errors })
  }
  next()
}
