import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  let history = useHistory();
  let location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    if (!searchWord) {
      setIsSearching(false);
    }
  }, [searchWord]);

  const handleInput = (e) => {
    setSearchWord(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const handleClick = () => {
    search();
  };

  const handleReset = () => {
    setSearchWord("");
    setIsSearching(false);
    history.push(`/search?lat=${parsed.lat}&lng=${parsed.lng}`);
  };

  const search = () => {
    // Use coords of Madrid if none are provided yet
    if (!(parsed.lat && parsed.lng)) {
      parsed.lat = 40.41677;
      parsed.lng = -3.70379;
    }

    parsed.q = searchWord;

    const stringified = queryString.stringify(parsed);

    // Go to search page
    history.push(`/search?${stringified}`);
    setIsSearching(true);
  };

  return (
    <div className="relative flex items-center text-gray-800">
      <input
        onChange={handleInput}
        onKeyPress={handleEnter}
        value={searchWord}
        type="text"
        size="70"
        className="h-10 px-4 rounded-full bg-white focus:outline-none border"
        placeholder="Type to search..."
      />
      <button className="absolute right-0 mr-3 text-gray-600 focus:outline-none">
        {!isSearching ? (
          <i className="fa fa-search" onClick={handleClick}></i>
        ) : (
          <i className="fas fa-times" onClick={handleReset}></i>
        )}
      </button>
    </div>
  );
}

export default SearchBar;
