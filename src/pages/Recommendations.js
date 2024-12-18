import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../components/Dropdown";
import Card from "../components/Card";

const RecommendationPage = () => {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [rating, setRating] = useState(0);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  // Fetch genres
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

  // Fetch languages
  const fetchLanguages = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/configuration/languages",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  // Fetch recommended movies
  const fetchRecommendedMovies = async () => {
    const genreQuery = selectedGenres.join(",");
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            with_genres: genreQuery,
            with_original_language: selectedLanguage,
            "vote_average.gte": rating,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setRecommendedMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
  }, []);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [selectedGenres, selectedLanguage, rating]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Recommended Movies
        </h3>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-11 mb-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-white mb-2">Select Genre</label>
          <Filter
            genres={genres}
            onGenreSelect={(selectedGenreIds) => setSelectedGenres(selectedGenreIds)}
          />
          </div>
          {/* Language Filter */}
          <div>
            <label className="block text-white mb-2">Select Language</label>
            <select
              className="py-2.5 text-sm text-white bg-red-700 rounded-lg"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((language) => (
                <option key={language.iso_639_1} value={language.iso_639_1}>
                  {language.english_name}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-white mb-2">Select Rating</label>
            <input
              type="number"
              className="p-2.5 text-sm bg-red-700 text-white rounded-lg"
              min="0"
              max="10"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start mt-6">
          {recommendedMovies.map((movie) => (
            <Card data={movie} key={movie.id} media_type="movie" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
