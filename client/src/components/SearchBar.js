import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function SearchBar(props) {
  let history = useHistory();
  let [searchWord, setSearchWord] = useState("");

  const handleClick = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className=" mt-4 header ml-4">
      <div className=" d-flex justify-content-center">
        <input
          style={{ width: "750px" }}
          onChange={handleClick}
          value={searchWord}
          type="text"
          className="form-control search-form mb-5 text-center ml-5"
          placeholder="Type to search..."
        />

        <Link to={`/search/${searchWord}`}>
          <button className="btn underline mb-5 bg-dark">
            <i className="fa fa-search text-light" aria-hidden="true"></i>
          </button>
        </Link>
      </div>
      <p>
        Hi,<Link>username!</Link>
      </p>
    </div>
  );
}

export default SearchBar;
