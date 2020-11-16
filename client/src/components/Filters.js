import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

export default function Filters(props) {
  let [products, setProducts] = useState("");
  let { category } = useParams();

  useEffect(() => {
    setProducts("");
    filterByCategory();
  }, [category]);

  const filterByCategory = () => {
    fetch(`http://localhost:5000/categories/${category}/products`)
      .then((response) => response.json())
      .then((response) => {
        response.length > 0 && setProducts(response);
      });
  };

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
}
