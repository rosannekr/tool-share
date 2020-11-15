import React, { useState, useEffect } from "react";

export default function Geolocation(props) {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUserLocation();
    if (props.products.length) setProducts(props.products);
  }, [props.products]);

  // Get user location

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    });
  };

  // Compare each product location to user's location

  const getProductDistances = () => {
    return products.map((product) => {
      product.distanceToUser =
        product.location.latitude -
        userLocation.latitude +
        (product.location.longitude - userLocation.longitude);
      return product;
    });
  };

  // Sort products by distance

  const sortByDistance = () => {
    const productsWithDistances = getProductDistances();
    const sortedProducts = productsWithDistances.sort((a, b) => {
      if (a.distanceToUser < b.distanceToUser) return -1;
      if (a.distanceToUser > b.distanceToUser) return 1;
      else return 0;
    });
    console.log(sortedProducts);
  };

  return <div></div>;
}
