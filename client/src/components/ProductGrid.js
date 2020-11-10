import React, { useEffect } from "react";
import { Link } from "react-router-dom";


export default function ProductGrid(props) {
  return (
    <div className="container text-center">
      <div className="row mt-4 justify-content-center">
        {props.products
          ? props.products.map((item) => (
              <div
                className="card col-md-3 ml-2 mb-4 rounded shadow itemCard"
                key={item.id}
              >
                <Link
                  to={"/product/" + item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {item.User && (
                    <p className="mt-1">
                      <i className="fas fa-user-astronaut"></i> {item.User.name}
                    </p>
                  )}
               <img className="img-fluid" src={`/../../../${item.picture.substring(7, item.picture.length)}`} />

                  <div className="card-body">
                    <h4 className="card-title">
                      {item.pricePerDay} <i className=" text-muted fas fa-coins"></i>/day
                    </h4>
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
