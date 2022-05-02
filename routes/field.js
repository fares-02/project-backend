const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { upload } = require("../middlewares/upload");
const fieldRoutes = express.Router();
const fieldSchema = require("../models/field");

fieldRoutes.post("/addfield", upload.single("image"), async (req, res) => {
  try {
    const field = new fieldSchema({ ...req.body, image: req.file.filename });
    await field.save();
    res.status(200).send({ msg: "field added successfully", field });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "couldn't add field" }] });
  }
});

fieldRoutes.get("/fields", async (req, res) => {
  try {
    const fields = await fieldSchema.find();
    res.status(200).send({ msg: "your fields", fields });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not get fields" }] });
  }
});

fieldRoutes.delete("/fields/:id", async (req, res) => {
  try {
    const field = await fieldSchema.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "field deleted" });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not delete field" }] });
  }
});

fieldRoutes.put("/fields/:id", async (req, res) => {
  try {
    const field = await fieldSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).send({ msg: "updated successfully" });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not update" }] });
  }
});

fieldRoutes.get("/fields/:id", async (req, res) => {
  try {
    const field = await fieldSchema.findById(req.params.id);
    res.status(200).send({ msg: "found successfully", field });
  } catch (error) {
    res.status(500).send({ errors: [{ msg: "could not find field" }] });
  }
});

module.exports = fieldRoutes;
