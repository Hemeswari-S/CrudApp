import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDB } from "./config/connectTODB.js";
import { User_route } from "./Routes/User_Root.js";
import { Sign_route } from "./Routes/SignUp&In_Root.js";

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
connectToDB();

app.use("/", User_route);
app.use("/signup", Sign_route);
app.all("*", (req, res) => {
  res.send("invalid URL..!");
});

app.listen(process.env.PORT, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});
