import "../App.css";
import { db } from "../config/Firebase-config";
import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";

function MainComp() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieName, setMovieName] = useState("");
  const [newMovieDate, setMovieDate] = useState(0);
  const [gotOscar, setGotOscar] = useState(false);
  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleSubmit = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieName,
        wonAnOscar: gotOscar,
        year: newMovieDate,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };
  return (
    <div className="App">
      <input
        type={"text"}
        placeholder={"Movie Named..."}
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
      ></input>
      <input
        type={"number"}
        placeholder={"Release Date..."}
        onChange={(e) => {
          setMovieDate(Number(e.target.value));
        }}
      ></input>
      <input
        type={"checkbox"}
        checked={gotOscar}
        onChange={(e) => {
          setGotOscar(e.target.checked);
        }}
      ></input>
      <span>Recieved an Oscar?</span>
      <button onClick={handleSubmit}>Submit Movie</button>
      <div>
        {" "}
        {movieList.map((movie) => (
          <div>
            {" "}
            <h1 style={{ color: movie.wonAnOscar ? "green" : "red" }}>
              {" "}
              {movie.title}{" "}
            </h1>
            <p> Date: {movie.year} </p>{" "}
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainComp;
