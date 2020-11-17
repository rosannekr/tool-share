import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import queryString from "query-string";
import { getFilteredProducts } from "../services/requests";

export default function Search() {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  // const { q } = queryString.parse(search);

  useEffect(() => {
    searchProducts();
  }, [search]);

  const searchProducts = async () => {
    try {
      const res = await getFilteredProducts(search);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
}
