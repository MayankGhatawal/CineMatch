import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Recommendations = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const query = location.search; // Get the query string from the URL
      const response = await fetch(`/api/recommendations${query}`);
      const data = await response.json();
      setMovies(data);
    };

    fetchRecommendations();
  }, [location.search]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-5">Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold text-white">{movie.title}</h2>
            <p className="text-sm text-gray-400">Genre: {movie.genre}</p>
            <p className="text-sm text-gray-400">Language: {movie.language}</p>
            <p className="text-sm text-gray-400">Rating: {movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
