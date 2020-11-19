import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React from "react";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const mapStyles = {
  width: "510px",
  height: "380px",
  display: "inline-block",
  overflow: "hidden",
};

function MapContainer(props) {
  // useEffect(() => {
  //   fetchData();
  //   // getCoords();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const res = await getProduct();
  //     setUserAddress(res.data.address);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //get coordinates in order to pass them to the map

  // let getCoords = async () => {
  //   if (props.address) {
  //     let formatted = props.address;

  //     let address = formatted.split(" ").join("+");

  //     fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  //     )
  //       .then((res) => res.json())
  //       .then((response) => {
  //         setLatitude(response.results[0].geometry.location.lat);
  //         setLongitude(response.results[0].geometry.location.lng);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

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
