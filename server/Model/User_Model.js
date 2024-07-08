import mongoose from "mongoose";

const User_Scheama = new mongoose.Schema({
  Id: { type: Number, required: true ,index: { unique: true },},
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
});
export const User = mongoose.model("User_collection", User_Scheama);
