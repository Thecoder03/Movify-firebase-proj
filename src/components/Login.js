import React, { useState } from "react";

import mt from "../pics/mt.jpg";
import GoogleBtn from "./GoogleBtn";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/Firebase-config";
//Import for the Modal
import Rodal from "rodal";
// include styles for rodal
import "rodal/lib/rodal.css";

function Login() {
  //Modal opening
  const [open, setOpen] = useState(false);
  const [rodalText, setRodalText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handling setting variable for closing the modal
  const handleClose = () => setOpen(false);

  //Handle sending user to other page when clicking the logo
  const handleLogoClick = () => {
    window.location.href = "http://localhost:3000";
  };

  const sendToCA = () => {
    window.location.href = "http://localhost:3000/ca";
  };

  const handleSignIn = () => {
    if (email === "" || password === "") {
      setOpen(true);
      setRodalText("You must enter an email and password to log in");
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
          switch (errorCode) {
            case "auth/id-token-expired":
              setRodalText("The firebase ID token for this project is expired");
              break;
            case "auth/id-token-revoked":
              setRodalText(
                "The firebase ID token for this project has been revoked"
              );
              break;
            case "auth/internal-error":
              setRodalText(
                "There has been an error on the internal error with the firebase system"
              );
              break;
            case "auth/project-not-found":
              setRodalText("The firebase project was not found");
              break;
            case "auth/session-cookie-expired":
              setRodalText("The firebase session cookie is expired");
              break;
            case "auth/session-cookie-revoked":
              setRodalText("The firebase cookie has been revoked");
              break;
            case "auth/user-not-found":
              setRodalText(
                "The user has not been found with the given credentials"
              );
            case "auth/invalid-email":
              setRodalText("The given email is not correct");
              break;
            case "auth/wrong-password":
              setRodalText("The password entered is wrong");
              break;

            default:
              setRodalText(errorCode);
              break;
          }
          setOpen(true);
        });
    }
  };

  const handlePassReset = () => {
    window.location.href = "http://localhost:3000/forgotpassword";
  };

  return (
    <div id="login-container">
      <Rodal
        height={150}
        animationDuration={200}
        animationTiming="linear"
        visible={open}
        onClose={handleClose}
      >
        <div className="login-rodal-container">
          <span className="login-rodal-text">{rodalText}</span>
        </div>
      </Rodal>
      <div id="login-box">
        <div className="username-login">
          <h1 className="login-top-h1" onClick={handleLogoClick}>
            Movify
          </h1>
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
            minLength={6}
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
          <h1>The one stop shop movie encyclopedia</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
