import logo from "./logo.svg";
import "./App.css";
import CreateAccount from "./components/CreateAccount";
import MainComp from "./components/MainComp";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/ca" element={<CreateAccount />} />
        <Route path="/mainpage" element={<MainComp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
