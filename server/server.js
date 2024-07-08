import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDB } from "./config/connectTODB.js";
import { User_route } from "./Routes/User_Root.js";
import { Sign_route } from "./Routes/SignUp&In_Root.js";
import https from 'https';
import fs from 'fs';

const app = express();

const corsOptions = {
  origin: 'https://crudapp-client.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use((req, res, next) => {
  console.log('Incoming Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  });
  next();
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Outgoing Response:', {
      statusCode: res.statusCode,
      headers: res.getHeaders()
    });
  });
  next();
});

connectToDB();

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.use("/", User_route);
app.use("/signup", cors(corsOptions), Sign_route); 
app.all("*", (req, res) => {
  res.send("invalid URL..!");
});

https.createServer(options, app).listen(process.env.PORT, () => {
  console.log(`Backend server running on https://localhost:${process.env.PORT}`);
});
