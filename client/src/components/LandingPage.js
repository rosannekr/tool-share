import React from "react";
import ProductGrid from "./ProductGrid";
import { Link } from "react-router-dom";

export default function Home(props) {

  return (
  
    <div className="text-center">
        <div className="container">
    <img className="img-fluid w-100 landing-picture" src="/../../../pictures/cover.jpg" />
    <div className="centered rounded"><h1 className="text-info pr-3 pl-3">The art of borrowing</h1>
     <h5 className="pr-3 pl-3 text-muted">save money, borrow your neighbours' stuff!</h5>
     <Link to="how-it-works"><button className="btn btn-dark text-white">learn how it works</button></Link>
     </div>
  
    </div>
  
  <ProductGrid products={props.products} />
  </div>
  );
}
