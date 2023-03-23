import React, { useState } from "react";
import NavBar from "./Navbar";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/Firebase-config";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotClick = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        window.location.href = "http://localhost:3000/login";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div id="forgotPassword-container">
      <NavBar />
      <div id="forgot-box">
        <h1 className="forgot-h1">Please enter your email below:</h1>
        <input
          maxLength={30}
          minLength={10}
          type={"email"}
          className="forgot-input"
          placeholder="Enter email here..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br></br>
        <button className="forgot-button" onClick={handleForgotClick}>
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
