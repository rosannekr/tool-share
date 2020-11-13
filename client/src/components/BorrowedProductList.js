import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/requests";
import { format } from "date-fns";
import StarRatingComponent from 'react-star-rating-component';


export default function BorrowedProductList(props) {
  let [items, setItems] = useState("");
  let [userId, setUserId] = useState("");
  let [rating, setRating] = useState("");

  useEffect(() => {
    getBorrowedProducts();
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    const res = await getProfile();
    setUserId(res.data.id);
  };

  const getBorrowedProducts = () => {
    console.log(userId);
    fetch(`http://localhost:5000/borrowed/user/${userId}`)
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
      });
  };

  let onStarClick = (nextValue, prevValue, name) => {
   console.log(name)
   console.log(nextValue)
   setRating(nextValue);
  }

  return (
    <div className="container">
      <ul className="list-group">
        <li class="list-group-item list-group-item-info d-flex justify-content-center">
          Borrowed stuff
        </li>
        {items && items.length > 0 ? (
          items.map((item) => (
            <li className="list-group-item ml-1 mt-1">
              <span>
                <Link to={`/product/${item.id}`}>{item.name} |</Link>{" "}
              </span>
              <span>
                {format(new Date(item.startDate), "MMM dd")} -{" "}
                {format(new Date(item.endDate), "MMM dd")}{" "}
                <i className="fa fa-calendar-check" aria-hidden="true"></i>
              </span>
              <p className="text-center mr-5 mt-2 brrwd">
                Rate this product:
                <span>
                <StarRatingComponent 
          name={item.id}
          starCount={5}
          value={item.rating}
          onStarClick={onStarClick}
        />
                </span>
              </p>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            {" "}
            You have no borrowed items.{" "}
            <Link to={`/`}>Do you need anything?</Link>{" "}
          </li>
        )}
      </ul>
    </div>
  );
}
