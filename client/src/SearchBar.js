import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory,Link } from "react-router-dom";

  function SearchBar() {
  let history = useHistory();

  let [filteredItems, setFilteredItems] = useState([]);
  let [searchWord, setSearchWord] = useState("");
  

  const search = () => {

    let url = `/products/`;
    if (searchWord) {
      url += `search/${searchWord}`;
    }

    console.log(url)

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setFilteredItems(response);
      }) .catch((error) => {
         console.log(error);
       });
      
      ;

    };

    const handleClick = (e) => {
      setSearchWord(e.target.value)
    }

  useEffect(() => {

  },[]);

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
        <button className="btn underline mb-4" onClick={search}>
          search
        </button>
        </Link>
    
      </div>


    </div>
  );
}

export default SearchBar;