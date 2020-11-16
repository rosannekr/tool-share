import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar(props) {
  let [searchWord, setSearchWord] = useState("");

  const handleInput = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <form className="relative flex items-center text-gray-800">
      <input
        onChange={handleInput}
        value={searchWord}
        type="text"
        size="70"
        className="h-10 px-4 rounded-full bg-white focus:outline-none border"
        placeholder="Type to search..."
      />

      <Link
        onClick={() => setSearchWord("")}
        to={`/search/${searchWord}`}
        className="absolute right-0 mr-3"
      >
        <i className="fa fa-search text-gray-600"></i>
      </Link>
    </form>
  );
}

export default SearchBar;
