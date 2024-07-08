import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connectToDB = async() => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected....!");
  } catch (err) {
    console.log(err);
  }
};
