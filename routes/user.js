const express = require("express");
const bcrypt = require("bcrypt");
const userRoutes = express.Router();
const userSchema = require("../models/user");
const isAuth = require("../middlewares/isAuth");
const jwt = require("jsonwebtoken");
const {
  RegisterValidation,
  Validation,
} = require("../middlewares/registerValidation");
require("dotenv").config;

userRoutes.post("/signUp", RegisterValidation, Validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new userSchema(req.body);
    const found = await userSchema.findOne({ email });
    if (found) {
      return res.status(400).send({ errors: [{ msg: "user already exists" }] });
    }

    const salt = 10;
    const hashedpassword = bcrypt.hashSync(password, salt);
    user.password = hashedpassword;

    const token = jwt.sign({ id: user._id }, process.env.secretOrkey);

    await user.save();
    res.status(200).send({ msg: "register succeeded", user, token });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "couldn't register" }] });
  }
});

userRoutes.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).send({ errors: [{ msg: "bad credentials" }] });
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).send({ errors: [{ msg: "bad credentials" }] });
    }
    const token = jwt.sign({ id: user._id }, process.env.secretOrkey, {
      expiresIn: "24h",
    });
    res.status(200).send({ msg: "sign in successfully", user, token });
  } catch (error) {
    console.log(error);
  }
});

userRoutes.get("/me", isAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRoutes;
