import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownCheckbox from "../components/DropdownCheckbox";
import Card from "../components/Card";

const TVGenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tvShows, setTVShows] = useState([]);

  // Fetch TV genres
  const fetchTVGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/tv/list?language=en",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching TV genres:", error);
    }
  };

  // Fetch TV shows by selected genres
  const fetchTVShowsByGenres = async (genreIds) => {
    if (genreIds.length === 0) return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${genreIds.join(
          ","
        )}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }
      );
      setTVShows(response.data.results);
    } catch (error) {
      console.error("Error fetching TV shows by genres:", error);
    }
  };

  useEffect(() => {
    fetchTVGenres();
  }, []);

  useEffect(() => {
    fetchTVShowsByGenres(selectedGenres);
  }, [selectedGenres]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          TV Shows by Genre
        </h3>

        {/* Genre Dropdown */}
        <DropdownCheckbox
          genres={genres}
          onGenreSelect={(selectedGenreIds) => setSelectedGenres(selectedGenreIds)}
        />

        {/* TV Shows Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start mt-6">
          {tvShows.map((show) => (
            <Card data={show} key={show.id} media_type="tv" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVGenrePage;
