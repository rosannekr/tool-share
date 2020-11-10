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

  useEffect(() => {
    getOneProduct();
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      // difference in milliseconds divided by amount of milliseconds in a day
      const daysDifference =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      setPointTotal(daysDifference * item.pricePerDay);
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
      fetch(`/users/borrowed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          productId,
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      makeUnavailable();
      deductPoints();
    }
  };

  let makeUnavailable = async () => {
    try {
      await updateProduct(item.id, { isAvailable: false });
    } catch (error) {
      console.log(error);
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

  return (
    <div className="container text-center item-page mt-5">
      {item && (
        <div className="card">
          <p className="card-header">
            Item posted by{" "}
            <span className="text-primary">{item.User.name}</span>
          </p>
          <div className="card-body">
            <h5 className="card-title">
              {item.name} | {item.pricePerDay} points/day
            </h5>
            <p className="card-text"></p>
            <p className="card-text text-secondary">{item.description}</p>
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

            {item.UserId !== user?.id ? (
              <div>
                <DateRange
                  changeStartDate={setStartDate}
                  changeEndDate={setEndDate}
                />
                <p>Points total: {pointTotal}</p>
                <button
                  onClick={() => borrowItem(item.id)}
                  className="btn btn-dark"
                >
                  Reserve
                </button>
              </div>
            ) : (
              <button
                onClick={() => updateProduct(item.id, { isAvailable: true })}
                className="btn btn-dark"
              >
                Make available
              </button>
            )}
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
