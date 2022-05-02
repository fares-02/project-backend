const express = require("express");
const connectDB = require("./config/connectDB");
const fieldRoutes = require("./routes/field");
const userRoutes = require("./routes/user");

const app = express();

require("dotenv").config();

connectDB();

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/field", fieldRoutes);

app.listen(process.env.port, () => {
  console.log(`server is running on ${process.env.port}`);
});
