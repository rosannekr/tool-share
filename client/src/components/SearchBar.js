import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";

  function SearchBar(props) {

let [searchWord, setSearchWord] = useState("");
  

    const handleClick = (e) => {
      setSearchWord(e.target.value)
    }

  return (

      <div className="d-flex justify-content-center mt-4">
        <input
          onChange={handleClick}
          value={searchWord}
          type="text"
          className="form-control search-form mb-5 text-center ml-5"
          placeholder="Type to search..."
        />
       
         <Link to={`/search/${searchWord}`}>
        <button className="btn underline mb-4 bg-dark">
         <i className="fa fa-search text-light" aria-hidden="true"></i>
        </button>
        </Link>
    
      </div>


  );
}

export default SearchBar;