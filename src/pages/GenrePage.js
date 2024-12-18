import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownCheckbox from "../components/Dropdown";
import Card from "../components/Card";

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMoviesByGenres = async (genreIds) => {
    if (genreIds.length === 0) return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds.join(
          ","
        )}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies by genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMoviesByGenres(selectedGenres);
  }, [selectedGenres]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Movies by Genre
        </h3>

        {/* Genre Dropdown */}
        <DropdownCheckbox
          genres={genres}
          onGenreSelect={(selectedGenreIds) => setSelectedGenres(selectedGenreIds)}
        />

        {/* Movies Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start mt-6">
          {movies.map((movie) => (
            <Card data={movie} key={movie.id} media_type="movie" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
