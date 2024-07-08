import  express  from "express";
import { CreateUser, GetAllUsers, GetUserById, UpdateUser, deleteUser } from "../Controller/UserController.js";
export const User_route= express.Router();


User_route.get('/',GetAllUsers);
User_route.get('/:id',GetUserById);
User_route.post('/',CreateUser);
User_route.put('/:id',UpdateUser);
User_route.delete('/:id',deleteUser);
