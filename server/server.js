import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDB } from "./config/connectTODB.js";
import { User_route } from "./Routes/User_Root.js";
import { Sign_route } from "./Routes/SignUp&In_Root.js";
import https from 'https';
import fs from 'fs';

const app = express();

// Configure CORS options
const corsOptions = {
  origin: 'https://crudapp-client.onrender.com', // Allow only this origin
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDB();

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