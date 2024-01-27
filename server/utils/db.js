const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Polymerz:hello123@cluster0.dkvseot.mongodb.net/polymerz_admin?retryWrites=true&w=majority"
  );
  console.log("Conncection successful to DB");
  try {
  } catch (error) {
    console.error("Failed to connect MongoDB: ", error);
  }
};

module.exports = connectDB;
