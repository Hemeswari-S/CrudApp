import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDB } from "./config/connectTODB.js";
import { User_route } from "./Routes/User_Root.js";
import { Sign_route } from "./Routes/SignUp&In_Root.js";
import https from 'https';
import fs from 'fs'

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDB();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // Allow these HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow these headers
  next();
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};


app.use("/", User_route);
app.use("/signup", Sign_route);
app.all("*", (req, res) => {
  res.send("invalid URL..!");
});
https.createServer(options, app).listen(process.env.PORT, () => {
  console.log(`Backend server running on https://localhost:${process.env.PORT}`);
});

