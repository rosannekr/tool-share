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

  return <div>distance</div>;
}
