import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { getFilteredProducts } from "../services/requests";
import queryString from "query-string";

export default function Search() {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const [isEnd, setIsEnd] = useState(false);

  // Fetch products every time the query string changes

  useEffect(() => {
    searchProducts();
  }, [search]);

  const searchProducts = async () => {
    try {
      const res = await getFilteredProducts(parsed);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    const params = { ...parsed, offset: 6 };

    try {
      const res = await getFilteredProducts(params);
      setProducts((products) => [...products, ...res.data]);
      if (res.data.length < 6) setIsEnd(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductGrid products={products} />
      {!isEnd && (
        <button
          onClick={loadMore}
          className="btn btn-primary mx-auto mb-5 block"
        >
          Load more
        </button>
      )}
    </div>
  );
}
