import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "../Components/Home/Home";
import Crud from "../Components/Crud/Table";
import SignUpComp from "../Components/SignUp/SignUp";
import SignIN from "../Components/SignIn/SignIN";


export default function Root() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIN/>}/>
          <Route path="/signup" element={<SignUpComp/>}/>
          <Route path="/Crud" element={<Crud />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
