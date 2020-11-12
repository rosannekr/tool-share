import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile, updateProduct } from "../services/requests";
import DateRange from "./DateRange";

export default function ProductPage(props) {
  let { id } = useParams();
  let [item, setItem] = useState("");
  let [days, setDays] = useState("");
  let [pointTotal, setPointTotal] = useState(0);
  const [user, setUser] = useState({});
  let [hasEnoughPoints, setHasEnoughPoints] = useState(true);
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);
  let [reserved, setReserved] = useState(false);

  useEffect(() => {
    getOneProduct();
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      // difference in milliseconds divided by amount of milliseconds in a day
      const daysDifference =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      // make sure point total doesn't go below 0
      const PointTotal =
        daysDifference >= 0 ? daysDifference * item.pricePerDay : 0;
      setPointTotal(PointTotal);
    } else {
      setPointTotal(0);
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
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
      setHasEnoughPoints(false);
    } else {
      fetch(`/borrowed`, {
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

      // Deduct points from borrower
      deductPoints();

      // Add points to owner
      addPoints();
    }
  };

  let handleInput = (e) => {
    setHasEnoughPoints(true);
    e.preventDefault();
    setDays(e.target.value);
    setPointTotal(e.target.value * item.pricePerDay);
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

  const addPoints = (pointTotal) => {};

  return (
    <div className="container text-center item-page mt-5">
      {item && (
        <div className="card">
          <p className="card-header">
            <span className="mr-1">Item posted by</span>
            <span className="text-primary">{item.User.name}</span>
          </p>
          <div className="card-body">
            <h5 className="card-title">
              {item.name} | {item.pricePerDay} points/day
            </h5>
            <p className="card-text"></p>
            <p className="card-text text-secondary">{item.description}</p>
            <p className="text-capitalize">Condition: {item.condition}</p>
            <p>Rating: {item.rating} stars</p>
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
                <small>Max availability: {item.NumOfDaysAvailable} days</small>
                <DateRange
                  productId={item.id}
                  changeStartDate={setStartDate}
                  changeEndDate={setEndDate}
                  maxAvailableDays={item.NumOfDaysAvailable}
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
          />
        </div>
      )}
    </div>
  );
}
