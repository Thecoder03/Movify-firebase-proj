import React, { useState } from "react";

import mt from "../pics/mt.jpg";
import GoogleBtn from "./GoogleBtn";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/Firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendToCA = () => {
    window.location.href = "http://localhost:3000/ca";
  };

  const handleSignIn = () => {
    if (email === "" || password === "") {
      alert("You must enter both email and password to sign in");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          window.location.href = "http://localhost:3000/homepage";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  const handlePassReset = () => {
    window.location.href = "http://localhost:3000/forgotpassword";
  };

  return (
    <div id="login-container">
      <div id="login-box">
        <div className="username-login">
          <h1 className="login-top-h1">Movify</h1>
          <br></br>
          <h2 className="login-top-h2">Login</h2>
        </div>
        <div className="password-login">
          <p className="login-text">Email</p>

          <input
            maxLength={30}
            className="login-inputs"
            type={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p className="login-text">Password</p>
          <input
            className="login-inputs"
            maxLength={20}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="login-box-span">
          <p onClick={handlePassReset} className="forgot-password">
            Forgot Password?
          </p>
          <button onClick={handleSignIn} className="login-btn">
            Login
          </button>
          <br></br>
          <button onClick={sendToCA} className="login-ca-btn">
            Create Account
          </button>
          <p className="forgot-password">Or Sign in with Google</p>
        </div>
        <div className="ca-login">
          <GoogleBtn />{" "}
        </div>
      </div>
      <div id="svg-background">
        <img src={mt} className="movie-img"></img>
        <div className="glass-container">
          <h1>The one stop shop for all your movie knowledge</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
