const { body, validationResult } = require("express-validator");

exports.RegisterValidation = [
  body("email", "not a valid email").isEmail(),
  body("password", "should be at least 6 characters").isLength({ min: 6 }),
];

exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};
