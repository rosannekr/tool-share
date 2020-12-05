import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import StarRatingComponent from "react-star-rating-component";
import { getBorrowedProducts, updateRequest } from "../services/requests";
import axios from "axios";

export default function BorrowedProductList(props) {
  let [requests, setRequests] = useState([]);
  let [rating, setRating] = useState("");
  let [review, setReview] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resRequests = await getBorrowedProducts();
      setRequests(resRequests.data);
    } catch (err) {
      console.log(err);
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

  const handleSubmit = async (id) => {
   
    await updateRequest(id, { review });
    fetchData();
  };

  return (
    <div className="container">
      <ul className="px-0">
        <li className="border list-none rounded-sm px-3 py-3 from-indigo-500 to-purple-400 bg-gradient-to-r text-white">
          Borrowed stuff
        </li>
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <li
              key={request.id}
              className="border list-none rounded-sm px-3 py-3"
            >
              <span className="font-bold">
                <Link to={`/product/${request.Product.id}`}>
                  {request.Product.name} |
                </Link>
              </span>
              <span className="px-2">
                {format(new Date(request.startDate), "MMM dd")} -{" "}
                {format(new Date(request.endDate), "MMM dd")}{" "}
                <i
                  className="fa fa-calendar-check text-indigo-700"
                  aria-hidden="true"
                ></i>
              </span>
              {request.review ? (
                <div className="d-flex justify-content-center">
                  <StarRatingComponent
                    name={request.id}
                    starCount={5}
                    value={request.rating}
                    onStarClick={onStarClick}
                  />
                  <div className="ml-2">{request.review}</div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center my-2">
                    <div className="mr-2">Rate this product:</div>

                    <StarRatingComponent
                      name={request.id}
                      starCount={5}
                      value={request.rating}
                      onStarClick={onStarClick}
                    />
                  </div>

                  <div className="mt-1">
                    <textarea
                      className="p-2 border border-gray-400 rounded "
                      rows="2"
                      cols="25"
                      placeholder="Write a review"
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    onClick={() => handleSubmit(request.id)}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              )}
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
