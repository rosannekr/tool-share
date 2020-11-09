import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar(props) {
  let [searchWord, setSearchWord] = useState("");

  const handleClick = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <form className="form-inline mx-auto">
      <input
        style={{ width: "750px" }}
        onChange={handleClick}
        value={searchWord}
        type="text"
        className="form-control text-center"
        placeholder="Type to search..."
      />

      <Link to={`/search/${searchWord}`} className="btn underline bg-dark">
        <i className="fa fa-search text-light" aria-hidden="true"></i>
      </Link>
    </form>
  );
}

export default SearchBar;
