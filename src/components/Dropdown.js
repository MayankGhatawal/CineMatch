import React, { useState, useRef, useEffect } from "react";

const DropdownCheckbox = ({ genres, onGenreSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    onGenreSelect(updatedGenres);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const getSelectedGenresText = () => {
    if (selectedGenres.length === 0) return "Select Genres";
    if (selectedGenres.length === 1) {
      const genre = genres.find(g => g.id === selectedGenres[0]);
      return genre ? genre.name : "1 Genre";
    }
    return `${selectedGenres.length} Genres`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`
          w-full px-4 py-3 
          bg-gray-700 hover:bg-gray-600 
          text-white font-medium 
          rounded-lg
          flex items-center justify-between
          transition-all duration-200
          border border-gray-600
          focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20
          ${isOpen ? 'ring-2 ring-red-500 ring-opacity-20' : ''}
        `}
        onClick={toggleDropdown}
      >
        <span className="truncate">{getSelectedGenresText()}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`
          absolute z-50 w-full mt-2
          bg-gray-800 rounded-lg shadow-lg
          border border-gray-700
          transform transition-all duration-200 origin-top
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className={`
                flex items-center p-2 rounded-md
                cursor-pointer transition-colors duration-150
                hover:bg-gray-700
                ${selectedGenres.includes(genre.id) ? 'bg-gray-700' : ''}
              `}
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="
                    hidden
                    peer
                  "
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleCheckboxChange(genre.id)}
                />
                <div className={`
                  w-5 h-5 
                  border-2 rounded
                  flex items-center justify-center
                  transition-colors duration-200
                  ${selectedGenres.includes(genre.id)
                    ? 'bg-red-500 border-red-500'
                    : 'border-gray-500 peer-hover:border-red-400'}
                `}>
                  {selectedGenres.includes(genre.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-white">{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default DropdownCheckbox;