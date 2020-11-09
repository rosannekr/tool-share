import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../services/requests";

export default function ProductPage(props) {
  let { id } = useParams();
  let [item, setItem] = useState("");
  let [days, setDays] = useState("");
  let [pointTotal, setPointTotal] = useState("");
  const [user, setUser] = useState({});
  let [hasEnoughPoints, setHasEnoughPoints] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    getOneProduct();
    fetchData();
  }, []);

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
    let id = user.id

    if (user.points < pointTotal) {
      setHasEnoughPoints(false);
    } else {
      fetch(`http://localhost:5000/users/${id}/borrowed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId,
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

  let makeUnavailable = () => {
    console.log(id);
    fetch(`http://localhost:5000/products/${id}/borrow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleInput = (e) => {
    setHasEnoughPoints(true);
    e.preventDefault();
    setDays(e.target.value);
    setPointTotal(e.target.value * item.pricePerDay);
  };

  let deductPoints = () => {

    let id = user.id
    let newPoints = user.points - pointTotal;

    fetch(`http://localhost:5000/users/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        points: newPoints
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    
  }

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
            <div className="borrowForm">
              <p>Number of days: </p>
              <form>
                <select
                  className="form-control"
                  value={days}
                  onChange={(e) => handleInput(e)}
                >
                  {Array.from(
                    { length: item.NumOfDaysAvailable + 1 },
                    (v, i) => i
                  ).map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </form>
              <p>Points total: {!pointTotal ? "0" : pointTotal}</p>
              <button
                onClick={() => borrowItem(item.id)}
                className="btn btn-dark"
              >
                Borrow it
              </button>
            </div>
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
