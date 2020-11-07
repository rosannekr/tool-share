import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

export default function Search(props) {
  let { q } = useParams();
  let [items, setItems] = useState([]);
 
  useEffect(() => {
    search();
  }, [q]);

  const search = () => {
      
        let url = `/products/`;
        if (q) {
          url += `search/${q}`;
        }
    
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            setItems(response)
          })
          .catch((error) => {
            console.log(error);
          });
      };
  

  return (
    <div>
    <ProductGrid products={items}/>
    </div>
  );
}
