import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProfile,
  getProduct,
  getProductRequests,
} from "../services/requests";
import DateRange from "./DateRange";
import StarRatingComponent from "react-star-rating-component";
import MapContainer from "./MapContainer";
import ReviewCard from "./ReviewCard";

import Noty from "noty";
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/relax.css";

export default function ProductPage(props) {
  let { id } = useParams();
  let [item, setItem] = useState("");
  let [pointTotal, setPointTotal] = useState(0);
  const [user, setUser] = useState("");
  let [hasEnoughPoints, setHasEnoughPoints] = useState(true);
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);
  let [reserved, setReserved] = useState(false);
  let [requests, setRequests] = useState([]);
  let [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Get owner and product data
    const res1 = await getProfile();
    const res2 = await getProduct(id);
    setUser(res1.data);
    setItem(res2.data);

    // Get all requests for this product
    const res3 = await getProductRequests(id);
    setRequests(res3.data);
    // Get all ratings, filter out nulls
    const ratings = res3.data
      .map((request) => request.rating)
      .filter((rating) => rating);
    // Calculate average rating
    const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    setAvgRating(Math.round(average));
  };

  useEffect(() => {
    // Calculate total price based on chosen dates
    if (startDate && endDate) {
      const daysDifference =
        // difference in milliseconds divided by amount of milliseconds in a day
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const PointTotal =
        // make sure point total doesn't go below 0
        daysDifference >= 0 ? daysDifference * item.pricePerDay : 0;
      setPointTotal(PointTotal);
    } else {
      setPointTotal(0);
    }
  }, [startDate, endDate]);

  let notification = (bool) => {
    new Noty({
      text: bool
        ? "Your request was sent to the owner"
        : "You do not have enought points",
      layout: "topRight",
      theme: "relax",
      type: bool ? "success" : "error",
      timeout: 3500,
      progressBar: true,
    }).show();
  };

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
    if (user.points < pointTotal) {
      notification(false);
      //setHasEnoughPoints(false);
    } else {
      fetch(`/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          productId,
          startDate: startDate,
          endDate: endDate,
        }),
      })
        .then((response) => {
          notification(true);
          // setReserved(true);
        })
        .catch((error) => {
          console.log(error);
        });

      // Deduct points from borrower (points are added to owner when request is confirmed)
      deductPoints();
    }
  };

  let deductPoints = () => {
    let newPoints = user.points - pointTotal;

    fetch(`/users/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        points: newPoints,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-column align-center mx-40 p-8">
      {item && user && (
        <div className="flex flex-column text-center h-height pt-5">
          <div className="flex flex-row justify-around">
            <img
              alt="product"
              class=" lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 mt-36"
              src={`/../../../${item.picture.substring(
                7,
                item.picture.length
              )}`}
            />
            <div className="flex flex-column text-center border rounded-md border-gray-700 w-50">
              <div className="flex flex-row justify-center">
                <img
                  alt="Placeholder"
                  className="block rounded-full h-8 w-8 object-cover"
                  src={`/../../../${user.picture.substring(
                    7,
                    item.User.picture.length
                  )}`}
                />

                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  {user.name}
                </h2>
              </div>

              <h1 class="text-gray-900 text-3xl title-font font-medium">
                {item.name}
              </h1>

              {avgRating ? (
                <StarRatingComponent
                  name={item.id}
                  starCount={5}
                  value={avgRating}
                  editing={false}
                />
              ) : (
                <span>no ratings yet</span>
              )}

              <small className="text-muted mb-3">
                added on {item.createdAt.substring(0, 10)}
              </small>
              <p class="leading-relaxed ">{item.description}</p>
              <p className="text-capitalize">Condition: {item.condition}</p>
              <div className="d-flex justify-content-center">
                {item.UserId !== user?.id && !reserved && (
                  <div>
                    <h4>Select dates</h4>
                    <small>
                      Max availability: {item.numOfDaysAvailable} days
                    </small>
                    <div className="text-center">
                    <DateRange
                      productId={item.id}
                      changeStartDate={setStartDate}
                      changeEndDate={setEndDate}
                      maxAvailableDays={item.numOfDaysAvailable}
                    />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-around">
                <span class="title-font font-medium text-xl text-gray-900">
                  Total: {pointTotal}{" "}
                </span>
                <button
                  onClick={() => borrowItem(item.id)}
                  className="btn btn-dark"
                  disabled={!(startDate && endDate) ? true : false}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-evenly  pr-6">
            <div class="w-1/2 overflow-hidden ml-5 pl-8 text-center">
              <div className="flex justify-center w-75 ml-36 mt-1">
                {requests
                  .filter((request) => request.review)
                  .map((request) => (
                    <ReviewCard key={request.id} request={request} />
                  ))}
              </div>
            </div>

            <div class="w-1/2 overflow-hidden ">
              <div className="mt-1">
                {item.User && <MapContainer address={item.User.address} />}{" "}
                .
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
