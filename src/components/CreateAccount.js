import React, { useState } from "react";
import { auth } from "../config/Firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import mt from "../pics/mt.jpg";
import GoogleBtn from "./GoogleBtn";
//Import for the Modal
import Rodal from "rodal";
// include styles for rodal
import "rodal/lib/rodal.css";

function CreateAccount() {
  //Modal opening
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rodalText, setRodalText] = useState("");
  console.log(auth?.currentUser?.email);

  //Handle sending user to other page when clicking the logo
  const handleLogoClick = () => {
    window.location.href = "http://localhost:3000";
  };

  //Handling setting variable for closing the modal
  const handleClose = () => setOpen(false);

  const handleToSignin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  //Create account
  const handleClick = async () => {
    if (email === "" || password === "") {
      setOpen(true);
      setRodalText(
        "You must enter an email and password before creating an account"
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("account created");
          // Signed in
          const user = userCredential.user;
          window.location.href = "http://localhost:3000/homepage";
        })
        .catch((error) => {
          const errorCode = error.code;

          switch (errorCode) {
            case "auth/email-already-in-use":
              setRodalText("The email provided is already in use");
              break;
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
            case "auth/invalid-email":
              setRodalText("Please enter a valid email address");
              break;

            default:
              setRodalText(errorCode);
              break;
          }
          setOpen(true);
        });
    }
  };

  return (
    <div id="ca-container">
      <Rodal
        height={150}
        animationDuration={200}
        animationTiming="linear"
        visible={open}
        onClose={handleClose}
      >
        <div className="ca-rodal-container">
          <span className="ca-rodal-text">{rodalText}</span>
        </div>
      </Rodal>
      <div id="ca-box">
        <div className="username-ca">
          <h1 className="ca-top-h1" onClick={handleLogoClick}>
            Movify
          </h1>
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
            minLength={6}
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
