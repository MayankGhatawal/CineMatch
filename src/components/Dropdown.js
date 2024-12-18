import React, { useState } from "react";

const DropdownCheckbox = ({ genres, onGenreSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleCheckboxChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    onGenreSelect(updatedGenres); // Pass selected genres to parent
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        id="dropdownCheckboxButton"
        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-11 py-2.5 text-center inline-flex items-center transition-all"
        type="button"
        onClick={toggleDropdown}
      >
        Default
        <svg
          className="w-2.5 h-2.5 ml-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownDefaultCheckbox"
          className="absolute mt-2 w-48 bg-zinc-800 divide-y text-white divide-gray-100 rounded-lg shadow z-10 transition-all"
        >
          <ul className="p-3 space-y-3 text-sm text-white">
            {genres.map((genre) => (
              <li key={genre.id}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-${genre.id}`}
                    type="checkbox"
                    value={genre.id}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                    onChange={() => handleCheckboxChange(genre.id)}
                    checked={selectedGenres.includes(genre.id)}
                  />
                  <label
                    htmlFor={`checkbox-${genre.id}`}
                    className="ml-2 text-sm font-medium text-white"
                  >
                    {genre.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
