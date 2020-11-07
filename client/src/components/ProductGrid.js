import React from "react";
import {Link} from "react-router-dom";

export default function ProductGrid(props) {
  return (
 
    <div className="container text-center grid">
      <div className="row mt-4 text-center">
        {props.products.length > 0
          ? props.products.map((item) => (

              <div
                className="card col-md-3 ml-2 mb-2 rounded shadow itemCard"
                key={item.id}
              >
                   <Link to={"/product/" + item.id} style={{ textDecoration: 'none', color: 'black' }}>
                <img
                  className="card-img-top pt-3"
                  src="https://picsum.photos/150"
                  alt="Product image"
                />

                <div className="card-body">
                  <h4 className="card-title">{item.pricePerDay} points/day</h4>
                 <h5 className="card-title">{item.name}</h5>   

                  <p className="card-text ">{item.description}</p>
                </div>
                </Link>
              </div>  
           
            ))
          : "No items matched your search"}
      </div>
    </div>
  
  );
}
