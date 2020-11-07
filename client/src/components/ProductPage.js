import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage(props) {
  let { id } = useParams();
  let [item, setItem] = useState("");

  useEffect(() => {
    getOneProduct();
  }, []);

  let getOneProduct = () => {
    fetch(`/products/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItem(json);
      });
  };

  return (
    <div className="container text-center item-page mt-5">
      {item && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">owned by {item.User.name}</p>
            <p className="card-text text-secondary">{item.description}</p>
            <p className="card-text">
              <small class="text-muted">{item.createdAt.substring(0,10)}</small>
            </p>
          </div>
          <img
            className="card-img-bottom"
            src="https://picsum.photos/600/700"
            alt="Card image cap"
          />
        </div>
      )}
    </div>
  );
}
