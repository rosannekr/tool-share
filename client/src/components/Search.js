import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { getFilteredProducts } from "../services/requests";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState("");
  const { search } = useLocation();

  // Fetch products every time the query string changes

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

  // Get user location

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    });
  };

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
}
