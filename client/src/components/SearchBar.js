import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!searchWord) setIsSearching(false);
  }, [searchWord]);

  const handleInput = (e) => {
    setSearchWord(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      history.push(`/search?q=${searchWord}`);
      setIsSearching(true);
    }
  };

  const handleClick = (e) => {
    history.push(`/search?q=${searchWord}`);
    setIsSearching(true);
  };

  const handleReset = (e) => {
    setSearchWord("");
    setIsSearching(false);
    history.push(`/home`);
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
