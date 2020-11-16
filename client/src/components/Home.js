import React from "react";
import ProductGrid from "./ProductGrid";

export default function Home(props) {
  return (
    <div>
      <ProductGrid products={props.products} />
    </div>
  );
}
