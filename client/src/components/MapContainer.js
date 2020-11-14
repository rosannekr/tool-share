import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";

const apiKey = REACT_APP_GOOGLE_API_KEY

const BarcelonaBounds = {
  north: 41.470001,
  south: 41.317271,
  west: 2.049637,
  east: 2.227478,
};

const mapStyles = {
  width: "670px",
  height: "500px",
};

function MapContainer(props) {
  let [latitude, setLatitude] = useState("41.3887489");
  let [longitude, setLongitude] = useState("2.139259");
  let [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    fetchData();
    getCoords();
  }, [longitude]);

  const fetchData = async () => {
    const res = await getProfile();
    setUserAddress(res.data.address);
  };

  //get coordinates in order to pass them to the map

  let getCoords = async () => {
    
    if (props.address) { 

    let formatted = props.address

    let address = formatted.split(" ").join("+");
 
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    .then(res => res.json())
      .then(response => {
        console.log(response)
       setLatitude(response.results[0].geometry.location.lat);
       setLongitude(response.results[0].geometry.location.lng);
      })
      .catch(err => console.log(err))
    }
  }
   
  return (
    <div>
      <Map
        google={props.google}
        zoom={17}
        style={mapStyles}
        center={{
          lat: latitude,
          lng: longitude,
          defaultBounds: { BarcelonaBounds },
        }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: REACT_APP_GOOGLE_API_KEY
})(MapContainer);
