import React from "react";
import Geolocation from "./Geolocation";
import ProductGrid from "./ProductGrid";

export default function Home(props) {
  return (
    <div>
      <Geolocation products={props.products} />
      <ProductGrid products={props.products} />
    </div>
  );
}
