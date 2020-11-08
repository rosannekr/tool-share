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

  let borrowItem = (productId) => {

    let id = 3 //user id not shared yet between components

    fetch(`http://localhost:5000/users/${id}/borrowed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productId,
       
      })
    })
      .then(response => {
       console.log(response)
      
      })
      .catch(error => {
        console.log(error);
      });

     makeUnavailable();

  }

  let makeUnavailable = () => {
    console.log(id)
    fetch(`http://localhost:5000/products/${id}/borrow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },

    })
      .then(response => {
       console.log(response)
      
      })
      .catch(error => {
        console.log(error);
      });

  }


  return (
    <div className="container text-center item-page mt-5">
      {item && (
        <div className="card">
        <p className="card-header">Item posted by <span className="text-primary">{item.User.name}</span></p>
          <div className="card-body">
     
      <h5 className="card-title">{item.name} | {item.pricePerDay} points/day</h5>
            <p className="card-text"></p>
            <p className="card-text text-secondary">{item.description}</p>
            <p className="card-text">
              <small className="text-muted">added on {item.createdAt.substring(0,10)}</small>
            </p>
            <button onClick={() => borrowItem(item.id)} className="btn btn-dark">Borrow it</button>
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
