import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/requests";
import { format } from "date-fns";
import StarRatingComponent from "react-star-rating-component";
import { getBorrowedProducts, updateRequest } from "../services/requests";

export default function BorrowedProductList(props) {
  let [requests, setRequests] = useState([]);
  let [rating, setRating] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resRequests = await getBorrowedProducts();
      setRequests(resRequests.data);
    } catch (error) {
      console.log(error);
    }
  };

  let onStarClick = (nextValue, prevValue, name) => {
    updateRating(name, nextValue);
    setRating(nextValue);
  };

  const updateRating = async (id, rating) => {
    await updateRequest(id, { rating });
    fetchData();
  };

  return (
    <div className="container">
      <ul className="list-group">
        <li className="list-group-item list-group-item-info d-flex justify-content-center">
          Borrowed stuff
        </li>
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <li key={request.id} className="list-group-item ml-1 mt-1">
              <span>
                <Link to={`/product/${request.Product.id}`}>
                  {request.Product.name} |
                </Link>
              </span>
              <span className="px-2">
                {format(new Date(request.startDate), "MMM dd")} -{" "}
                {format(new Date(request.endDate), "MMM dd")}{" "}
                <i className="fa fa-calendar-check" aria-hidden="true"></i>
              </span>
              <p className="text-center mr-5 mt-2 brrwd">
                Rate this product:
                <span className="px-2">
                  <StarRatingComponent
                    name={request.id}
                    starCount={5}
                    value={request.rating}
                    onStarClick={onStarClick}
                  />
                </span>
              </p>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            You have no borrowed items.
            <Link to={`/`}>Do you need anything?</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
