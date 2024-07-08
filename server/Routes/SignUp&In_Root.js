import  express  from "express";
import { SignIN, SignUp } from "../Controller/SignUp&In_Contoller.js";
export const Sign_route= express.Router();

Sign_route.post('/',SignUp);
Sign_route.post('/In',SignIN);
