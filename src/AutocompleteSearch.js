import React, { useState, useEffect, useRef } from 'react';

function AutocompleteSearch({ doctors, searchTerm, setSearchTerm }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    const matches = doctors
      .filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3);
    setSuggestions(matches);
  }, [searchTerm, doctors]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      // The filtering is handled in App.js by searchTerm state
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click event to register
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        placeholder="Search doctors"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        data-testid="autocomplete-input"
        ref={inputRef}
        className="autocomplete-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doc) => (
            <li
              key={doc.id}
              onClick={() => handleSuggestionClick(doc.name)}
              data-testid="suggestion-item"
              className="suggestion-item"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteSearch;
