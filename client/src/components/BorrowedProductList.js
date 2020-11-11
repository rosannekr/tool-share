import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BorrowedProductList(props) {
  let [items, setItems] = useState("");

  useEffect(() => {

    getBorrowedProducts();

  }, []);



  const getBorrowedProducts = () =>  {
    axios.get('users/borrowed')
  .then((response) => {
    console.log(response.data)
    setItems(response.data);

  });
  }


  return (
    <div className="container">
      <ul className="list-group">
        <li class="list-group-item list-group-item-info d-flex justify-content-center">
          Borrowed stuff
        </li>
        {items ? (
          items.map((item) => (
            <li className="list-group-item">
              <Link to={`/product/${item.id}`}>{item.name}</Link> |

              <span className="ml-1">
                Message owner <i className="far fa-envelope ml-1"></i> </span>
      
            </li>
          ))
        ) : (
          <li className="list-group-item"> You have no borrowed items. <Link to={`/`}>Do you need anything?</Link> </li>
        )}
      </ul>
    </div>
  );
}
