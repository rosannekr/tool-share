import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";

const mapStyles = {
  width: "670px",
  height: "500px",
};


function MapContainer(props)  {

 let [location, setLocation] = useState({lat: 47.49855629475769, lng: -122.14184416996333})

 Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

 Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);


  // let displayMarkers = () => {
  //   return location.map((store, index) => {
  //     return <Marker key={index} id={index} position={{
  //      lat: location.latitude,
  //      lng: location.longitude
  //    }}
  //    onClick={() => console.log("You clicked me!")} />
  //   })
  // }


    return (
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
  >         
  <Marker
  position = {location} />
  
  </Map>
      
    );
  }


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY 

})(MapContainer);