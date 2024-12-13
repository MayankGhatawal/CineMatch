import React, { useState } from "react";

const DropdownCheckbox = ({ genres, onGenreSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown visibility
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleCheckboxChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre) // Remove genre
      : [...selectedGenres, genre]; // Add genre

    setSelectedGenres(updatedGenres);
    onGenreSelect(updatedGenres); // Notify parent component
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown open/close state
  };

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        id="dropdownCheckboxButton"
        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all"
        type="button"
        onClick={toggleDropdown}
      >
        Select Genre
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownDefaultCheckbox"
          className="absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow z-10 transition-all "
        >
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {genres.map((genre) => (
              <li key={genre}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-${genre}`}
                    type="checkbox"
                    value={genre}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                    onChange={() => handleCheckboxChange(genre)}
                    checked={selectedGenres.includes(genre)}
                  />
                  <label
                    htmlFor={`checkbox-${genre}`}
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    {genre}
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
