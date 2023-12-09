
import React, { useState, useEffect } from "react";
import MovieCart from "./MovieCart";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=9a79e5db";

/*const movie = {
  Title: "Batman: The Animated Series",
  Year: "1992–1995",
  imdbID: "tt0103359",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg",
};*/

const App = () => {

  const [movies, setMovies] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");


  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search);
  };


  useEffect(() => {
    searchMovies("batman");
  }, []);


  return (
    <div className="app">
      <h1>Moviesphere</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0  ? ( <div className="container">
        {movies.map((movie) => (
          <MovieCart movie={movie} />
        ))}
      </div>

        ): (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }

     
    </div>
  )
};

export default App;
