const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

const isAuth = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "not authorized" }] });
    }
    const decoded = jwt.verify(token, process.env.secretOrkey);
    const user = await userSchema.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuth;
