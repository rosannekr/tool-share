import React from "react";
import { Link } from "react-router-dom";
import Filters from "./Filters";

export default function ProductGrid(props) {
  // // Set location property on products

  // const getProductLocations = () => {
  //   const productsWithLocation = props.products.map((product) => {
  //     product.location = getCoords(product.User.address);
  //     return product;
  //   });
  //   return productsWithLocation;
  // };

  // // Get coords of product locations

  // const getCoords = (address) => {
  //   const formattedAddress = address.split(" ").join("+");

  //   const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  //   const location = {};

  //   fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`
  //   )
  //     .then((res) => res.json())
  //     .then((response) => {
  //       location.latitude = response.results[0].geometry.location.lat;
  //       location.longitude = response.results[0].geometry.location.lng;
  //     })
  //     .catch((err) => console.log(err));

  //   return location;
  // };

  // // Get user location

  // const getUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;
  //     setUserLocation({ latitude, longitude });
  //   });
  // };

  // // Compare each product location to user's location

  // const getProductDistances = () => {
  //   return products.map((product) => {
  //     product.distanceToUser =
  //       product.location.latitude -
  //       userLocation.latitude +
  //       (product.location.longitude - userLocation.longitude);
  //     return product;
  //   });
  // };

  // const sortByDistance = () => {
  //   const productsWithDistances = getProductDistances();
  //   const sortedProducts = productsWithDistances.sort((a, b) => {
  //     if (a.distanceToUser < b.distanceToUser) return -1;
  //     if (a.distanceToUser > b.distanceToUser) return 1;
  //     else return 0;
  //   });
  //   setProducts(sortedProducts);
  // };

  return (
    <div>
      <Filters />
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex items-center justify-center flex-wrap mx-5 my-4 lg:-mx-4">
          {props.products && props.products.length > 0 ? (
            props.products.map((item) => (
              <div
                key={item.id}
                className="my-1 px-1 text-center md:w-1/3 lg:my-4 lg:px-4 lg:w-1/3"
              >
                <Link
                  to={"/product/" + item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <article className="overflow-hidden w-11/12 text-center rounded-lg shadow-lg">
                    <img
                      alt="Placeholder"
                      className="block h-auto w-full object-cover"
                      src={`/../../../${item.picture.substring(
                        7,
                        item.picture.length
                      )}`}
                    />

                    <header className="text-center leading-tight p-2 md:p-4">
                      <p
                        className="no-underline text-xl font-bold text-center text-indigo-800"
                        href="#"
                      >
                        {item.name}
                      </p>
                    </header>
                    <p className="text-center">{item.description}</p>
                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                      <div
                        className="flex items-center no-underline hover:underline text-black"
                        href="#"
                      >
                        <img
                          alt="Placeholder"
                          className="block rounded-full h-8 w-8 object-cover"
                          src={`/../../../${item.User.picture.substring(
                            7,
                            item.User.picture.length
                          )}`}
                        />
                        <p className="ml-2 text-sm">{item.User.name}</p>
                      </div>
                      <p className="text-grey-darker text-sm">
                        {item.pricePerDay}{" "}
                        <i className=" mr-1 text-indigo-800 fas fa-coins"></i>
                        /day
                      </p>
                    </footer>
                  </article>
                </Link>
              </div>
            ))
          ) : (
            <div>No items matched your search</div>
          )}
        </div>
      </div>
    </div>
  );
}
