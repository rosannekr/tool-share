import React, { useState, useEffect } from "react";

export default function Geolocation() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  };

  const getCoords = async () => {
    if (props.address) {
      let formatted = props.address;

      let address = formatted.split(" ").join("+");

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setLatitude(response.results[0].geometry.location.lat);
          setLongitude(response.results[0].geometry.location.lng);
        })
        .catch((err) => console.log(err));
    }
  };

  return <div>distance</div>;
}
