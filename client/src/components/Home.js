import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { getProducts } from "../services/requests";

export default function Home(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProducts();
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
