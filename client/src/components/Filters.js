import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

export default function Filters(props) {
    let [items, setItems] = useState("");
    let { category } = useParams();
  
    useEffect(() => {
        setItems("")
        filterByCategory();
      }, [category]);


  const filterByCategory = () => {
  
    fetch(`http://localhost:5000/categories/${category}/products`)
      .then((response) => response.json())
      .then((response) => {
        response.length > 0 && setItems(response);
      });
  };

    return (
        <div>
         <ProductGrid products={items}/>
        </div>
    )
}
