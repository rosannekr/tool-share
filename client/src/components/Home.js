import React from "react";
import ProductGrid from "./ProductGrid";

export default function Home(props) {
  return <ProductGrid products={props.products} />;
}
