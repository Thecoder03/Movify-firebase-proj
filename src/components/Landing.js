import React, { useState } from "react";
import NavBar from "./Navbar";

function Landing() {
  //Use States
  const [movie, setMovie] = useState("");

  //Handle Functions
  const handleMovieSubmit = () => {};

  //Scroll func
  const scrollToAbout = (e) => {
    e.preventDefault();
    // Scroll to a certain element
    document.getElementById("landing-middle-top")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  //Scroll func
  const scrollToTop = (e) => {
    e.preventDefault();
    // Scroll to a certain element
    document.getElementById("landing-container")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div id="landing-container">
      <div className="landing-navbar-container">
        <NavBar />
      </div>
      <div className="TopBody">
        <div className="landing-top-container">
          {" "}
          <h1
            onClick={(e) => {
              scrollToAbout(e);
            }}
            className="landing-logo"
          >
            Movify
          </h1>
        </div>
        <h1 className="landing-logo-slogan">
          Your one stop shop movie encyclopedia
        </h1>
        <input
          className="landing-search-input"
          type="text"
          placeholder="Search Movie Here..."
          onChange={(e) => {
            setMovie(e.target.value);
          }}
        ></input>
        <button className="landing-search-button" onClick={handleMovieSubmit}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <div
          className="down-circle"
          onClick={(e) => {
            scrollToAbout(e);
          }}
        >
          <i class="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <div className="MiddleBody">
        <div id="landing-middle-top">
          {" "}
          <h1 className="landing-middle-top-h1"> Why use Movify?</h1>
        </div>
        <div id="landing-middle-body">
          <div className="landing-middle-box">
            <div className="lm-box-left">
              <div className="lm-box-left-1">
                <h1>Expansive Movie Library</h1>
              </div>
              <div className="lm-box-left-2">
                <h1>Accurate Movie Knowledge</h1>
              </div>
            </div>
            <div className="lm-box-right">
              <p className="lm-box-right-text">
                As a movie lover, you know that finding reliable and
                comprehensive information on the films you love is crucial.
                That's where Movify comes in. Unlike other movie knowledge
                websites like IMDB or Rotten Tomatoes, Movify offers a unique
                experience that caters to your specific interests. Our website
                is user-friendly, easy to navigate, and allows you to quickly
                access detailed information on movies and TV shows.
              </p>
            </div>
          </div>
          <div
            className="up-circle"
            onClick={(e) => {
              scrollToTop(e);
            }}
          >
            <i class="fa-solid fa-angle-up"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
