import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";

  function SearchBar(props) {

let [searchWord, setSearchWord] = useState("");
  

    const handleClick = (e) => {
      setSearchWord(e.target.value)
    }

  return (
    <div className="container ">
      <div className="d-flex justify-content-center">
        <input
          onChange={handleClick}
          value={searchWord}
          type="text"
          className="form-control search-form mb-5 text-center ml-5"
          placeholder="Type something here..."
        />
       
         <Link to={`/search/${searchWord}`}>
        <button className="btn underline mb-4">
          search
        </button>
        </Link>
    
      </div>

    </div>
  );
}

export default SearchBar;