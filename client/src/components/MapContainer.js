import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React from "react";

const apiKey = "AIzaSyCY5W1P8DPRt-14tjH8O4jiLsFxxRp2Jl8";

const mapStyles = {
  width: "510px",
  height: "380px",
  display: "inline-block",
  overflow: "hidden",
};

function MapContainer(props) {

  return (
    <div className="overflow-hidden">
      <Map
        google={props.google}
        zoom={17}
        style={mapStyles}
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
      >
        <Marker position={{ lat: props.lat, lng: props.lng }} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
