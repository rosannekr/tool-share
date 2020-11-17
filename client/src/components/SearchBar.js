import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SearchBar(props) {
  let [searchWord, setSearchWord] = useState("");
  let [isSearching, setIsSearching] = useState(false);
  let history = useHistory();

  const handleInput = (e) => {
    setSearchWord(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      history.push(`/search/${searchWord}`);
      setIsSearching(true);
    }
  };

  const handleClick = () => {
    setIsSearching(true);
  };

  const handleReset = () => {
    setSearchWord("");
    setIsSearching(false);
  };

  return (
    <form className="relative flex items-center text-gray-800">
      <input
        onChange={handleInput}
        onKeyPress={handleEnter}
        value={searchWord}
        type="text"
        size="70"
        className="h-10 px-4 rounded-full bg-white focus:outline-none border"
        placeholder="Type to search..."
      />

      <Link
        to={`/search/${searchWord}`}
        className="absolute right-0 mr-3 text-gray-600"
      >
        {!isSearching ? (
          <i className="fa fa-search" onClick={handleClick}></i>
        ) : (
          <i className="fas fa-times" onClick={handleReset}></i>
        )}
      </Link>
    </form>
  );
}

export default SearchBar;
