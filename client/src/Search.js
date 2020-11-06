import React from "react";
import { useState, useEffect } from "react";

export default function Search(props) {
  let [filteredItems, setFilteredItems] = useState("");

  useEffect(() => {
    search();
  }, [filteredItems]);

  const search = () => {
        let searchWord = props.match.params.search;
        let url = `/products/`;
        if (searchWord) {
          url += `search/${searchWord}`;
        }
    
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            setFilteredItems(response);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  

  return (
    <div>
      {filteredItems &&
        filteredItems.map((item) => (
          <div>
            <h5>{item.name}</h5>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}
