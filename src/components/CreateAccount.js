import React, { useState } from "react";
import { auth } from "../config/Firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import mt from "../pics/mt.jpg";
import GoogleBtn from "./GoogleBtn";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);

  const handleToSignin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  //Create account
  const handleClick = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.href = "http://localhost:3000/homepage";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div id="ca-container">
      <div id="ca-box">
        <div className="username-ca">
          <h1 className="ca-top-h1">Movify</h1>
          <br></br>
          <h2 className="ca-top-h2">Create Account</h2>
        </div>
        <div className="password-ca">
          <p className="ca-text">Email</p>

          <input
            maxLength={30}
            className="ca-inputs"
            type={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <p className="ca-text">Password</p>
          <input
            className="ca-inputs"
            maxLength={20}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="ca-box-span">
          <button onClick={handleClick} className="ca-btn">
            Create Account
          </button>
          <br></br>
          <button onClick={handleToSignin} className="signin-btn">
            Sign in
          </button>
          <p className="forgot-password">Or Sign in with Google</p>
        </div>
        <div className="ca-google">
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

export default CreateAccount;
