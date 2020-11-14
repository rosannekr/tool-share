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
    console.log(res3);

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

  let borrowItem = (productId) => {
    if (user.points < pointTotal) {
      setHasEnoughPoints(false);
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
          setReserved(true);
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
    <div className="container text-center item-page mt-5">
      {item && (
        <div className="card">
          <p className="card-header">
            <span className="mr-1">Item posted by</span>
            <span className="text-primary">{user.name}</span>
          </p>
          <div className="card-body">
            <h5 className="card-title">
              {item.name} | {item.pricePerDay} points/day
            </h5>

            <p className="card-text"></p>
            <p className="card-text text-secondary">{item.description}</p>
            <p className="text-capitalize">Condition: {item.condition}</p>
            <div className="d-flex justify-content-center">
              <p className="mr-1">Rating:</p>
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
            </div>

            <p className="card-text">
              <small className="text-muted">
                added on {item.createdAt.substring(0, 10)}
              </small>
            </p>

            {!hasEnoughPoints && (
              <p className="bg-danger text-light">
                Sorry but you don't have enough points to borrow this item
              </p>
            )}

            {item.UserId !== user?.id && !reserved && (
              <div>
                <h4>Select dates</h4>
                <small>Max availability: {item.numOfDaysAvailable} days</small>
                <DateRange
                  productId={item.id}
                  changeStartDate={setStartDate}
                  changeEndDate={setEndDate}
                  maxAvailableDays={item.numOfDaysAvailable}
                />
                <p>Points total: {pointTotal}</p>
                <button
                  onClick={() => borrowItem(item.id)}
                  className="btn btn-dark"
                  disabled={!(startDate && endDate) ? true : false}
                >
                  Reserve
                </button>
              </div>
            )}
            {reserved && (
              <div className="text-success">
                Your request has been sent to the owner!
              </div>
            )}
          </div>
          <img
            className="card-img-bottom"
            src={`/../../../${item.picture.substring(7, item.picture.length)}`}
<<<<<<< HEAD
          />
          <div className="py-4">
            <h5>Reviews</h5>
            <div>
              {requests
                .filter((request) => request.review)
                .map((request) => (
                  <ReviewCard key={request.id} request={request} />
                ))}
            </div>
          </div>
          <MapContainer address={item.User.address} />
        </div>
      )}
=======
          />  
           <MapContainer address={item.User.address} />
        </div>
      )}
   
>>>>>>> 2737779... small changes
    </div>
  );
}
