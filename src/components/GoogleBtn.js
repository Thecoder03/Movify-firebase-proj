import React, { useState } from "react";
//Firebase Imports
import { auth, googleProvider } from "../config/Firebase-config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
//Google Image Icon
import gIcon from "../pics/gIcon.png";

function GoogleBtn() {
  const [loginMethod, setLoginMethod] = useState(null);
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

  onAuthStateChanged(auth, (user) => {
    if (loginMethod == "popup") {
      console.log("Login method was google popup");
      sessionStorage.setItem("currentUser", user.displayName);
      console.log(user.displayName);
      window.location.href = "http://localhost:3000/homepage";
    }
  });

  return (
    <div className="g-btn-comp" onClick={handleClickG}>
      <img className="gLogo" src={gIcon}></img>
      <span className="g-btn-text">Google Sign-in</span>
    </div>
  );
}

export default GoogleBtn;
