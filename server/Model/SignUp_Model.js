import mongoose from "mongoose";

const SignUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

export const Sign = mongoose.model("SignUp", SignUpSchema);
