//React Hooks Used
import React, { useEffect, useState } from "react";
//Google Image Icon
import gIcon from "../pics/gIcon.png";
//Firebase Imports
import { auth, googleProvider } from "../config/Firebase-config";

import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
//Import for the my List button Modal
import Rodal from "rodal";
// include styles for rodal
import "rodal/lib/rodal.css";

function NavBar() {
  //Modal opening
  const [open, setOpen] = useState(false);
  //Set Visiblity for first button
  const [isVisible, setIsVisible] = useState(true);
  //Track which login button and method was used
  const [loginMethod, setLoginMethod] = useState(null);
  //Buttons for the Navbar
  const [button1, setButton1] = useState("My List");
  const [button2, setButton2] = useState("Login");
  const [button3, setButton3] = useState("Google Sign-In");

  const visibilityStyle = {
    visibility: isVisible ? "visible" : "hidden",
  };

  //Handling setting variable for closing the modal
  const handleClose = () => setOpen(false);

  //Google Signin with popup
  const handleClickG = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
        .then((result) => {
          const user = result.user;
          console.log("User UID:", user.uid);
          setLoginMethod("popup");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleButton1 = async () => {
    setOpen(true);
  };
  const handleButton2 = async () => {
    if (isVisible == false) {
      window.location.href = "http://localhost:3000/list";
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (loginMethod == "popup") {
      console.log("Login method was google popup");
      sessionStorage.setItem("currentUser", user.displayName);
      console.log(user.displayName);
      setButton3(user.displayName);
      setIsVisible(false);
      setButton2("My List");
      window.location.href = "http://localhost:3000/homepage";
    }
  });

  return (
    <div className="navBar">
      <Rodal
        height={150}
        animationDuration={200}
        animationTiming="linear"
        visible={open}
        onClose={handleClose}
      >
        <div className="rodal-text-container">
          <span className="rodal-text">
            {" "}
            You must login before going to your list
          </span>
        </div>
      </Rodal>
      <div className="logo">
        <h1>Movifiy</h1>
      </div>
      <div className="otherPages">
        <div
          style={visibilityStyle}
          className="list-box"
          onClick={handleButton1}
        >
          <span className="list-span">{button1}</span>
        </div>
        <div className="normalLogin-box" onClick={handleButton2}>
          {" "}
          <span className="normalLogin-span">{button2}</span>
        </div>

        <div className="googleLogin" onClick={handleClickG}>
          <img className="gLogo" src={gIcon}></img>
          <span className="gText">{button3}</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
