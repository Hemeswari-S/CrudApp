import { Sign } from "../Model/SignUp_Model.js";
import bcrypt from "bcrypt";

export const SignUp = async (req, res) => {
  try {
    const name = req.body.username;
    let password = req.body.password;
    const data = await Sign.findOne({ username: name });
    if (!data) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await Sign.create({
        username: name,
        password: hashedPassword,
      });
      res.send("success");
    } else {
      res.send("Username is Not Available");
    }
  } catch (err) {
    res.status(500)
    res.send(err.message);  }
};

export const SignIN = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Sign.findOne({ username });
    if (!user) {
      return res.send("Invalid username ") ;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send("Invalid password");
    }
    res.send("success");
  } catch (error) {
    res.status(500)
    res.send(err.message);  }
};
