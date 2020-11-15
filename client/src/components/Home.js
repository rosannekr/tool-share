import React, { useState, useEffect } from "react";
import Geolocation from "./Geolocation";
import ProductGrid from "./ProductGrid";

export default function Home(props) {
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    getUserLocation();
    if (props.products) {
      setProducts(getProductLocations());
    }
  }, [props.products]);

  // Set location property on products

  const getProductLocations = () => {
    const productsWithLocation = props.products.map((product) => {
      product.location = getCoords(product.User.address);
      return product;
    });
    return productsWithLocation;
  };

  // Get coords of product locations

  const getCoords = (address) => {
    const formattedAddress = address.split(" ").join("+");

    const apiKey = "AIzaSyBQLZcLztSN1YicHUo_7TxlfPsPLwASlzE";

    const location = {};

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((response) => {
        location.latitude = response.results[0].geometry.location.lat;
        location.longitude = response.results[0].geometry.location.lng;
      })
      .catch((err) => console.log(err));

    return location;
  };

  // Get user location

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    });
  };

  // Compare each product location to user's location

  const getProductDistances = () => {
    console.log(userLocation);
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
    setProducts(sortedProducts);
  };

  return (
    <div>
      <button onClick={sortByDistance}>Show nearby items</button>
      {/* <Geolocation products={products} /> */}
      <ProductGrid products={products} />
    </div>
  );
}
