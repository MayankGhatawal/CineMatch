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
    <div className="py-16 min-h-screen bg-gray-900">
      <div className="container mx-auto pt-5 px-4">
        <h3 className="text-2xl lg:text-3xl font-bold text-red-600 mb-8">
          Discover Movies
        </h3>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h4 className="text-xl text-white font-semibold mb-6">Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Genre Filter */}
            <div className="space-y-2">
              <label className="block text-white font-medium">Genre</label>
              <Filter
                genres={genres}
                onGenreSelect={(selectedGenreIds) => setSelectedGenres(selectedGenreIds)}
                className="w-full"
              />
            </div>

            {/* Language Filter */}
            <div className="space-y-2">
              <label className="block text-white font-medium">Language</label>
              <select
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-colors duration-200"
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
            <div className="space-y-2">
              <label className="block text-white font-medium">
                Minimum Rating: {rating}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                  min="0"
                  max="10"
                  step="0.5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <span className="text-white font-medium min-w-[2.5rem]">
                  {rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recommendedMovies.map((movie) => (
            <Card data={movie} key={movie.id} media_type="movie" />
          ))}
        </div>

        {recommendedMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No movies found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;