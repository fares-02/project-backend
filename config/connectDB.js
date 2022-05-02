const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log({ msg: "DB is not connected", error });
  }
};

module.exports = connectDB;
