import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  getProduct,
  getUser,
  deleteRequest,
  updateRequest,
  updatePoints,
} from "../services/requests";

export default function RequestCard(props) {
  const [product, setProduct] = useState({});
  const [borrower, setBorrower] = useState({});

  // Calculate how many days this will be borrowed
  const daysDifference =
    (new Date(props.request.endDate).getTime() -
      new Date(props.request.startDate).getTime()) /
    (1000 * 60 * 60 * 24);
  // Calculate total points
  const points = Number(daysDifference * product.pricePerDay);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProduct(props.request.ProductId);
        setProduct(product.data);
        const user = await getUser(props.request.UserId);
        setBorrower(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRequest(id);
    } catch (error) {
      console.log(error);
    }
    props.fetchData();
  };

  const handleConfirm = async (id) => {
    try {
      // set confirmed to true
      await updateRequest(id, 1);
      // add points to user
      await updatePoints(points);
    } catch (error) {
      console.log(error);
    }
    props.fetchData();
  };

  const className = props.request.confirmed
    ? "text-secondary border-bottom p-3 d-flex justify-content-between"
    : "border-bottom p-3 d-flex justify-content-between";

  return (
    <div className={className}>
      <div className="mr-3" style={{ height: "20px" }}>
        <div>{borrower.name}</div>
        <img
          src="https://picsum.photos/id/1005/50"
          className="rounded-circle"
        />
      </div>

      <div className="text-left">
        <small>{new Date(props.request.createdAt).toLocaleDateString()}</small>
        <div>
          <span>{product.name} | </span>
          <span>
            {format(new Date(props.request.startDate), "MMM dd")} -{" "}
            {format(new Date(props.request.endDate), "MMM dd")}
          </span>
        </div>
        <div>
          {points}
          <i className="fas fa-coins ml-1"></i>
        </div>
      </div>
      <div className="align-self-center ml-3">
        <button
          onClick={() => handleConfirm(props.request.id)}
          className="btn btn-secondary mr-2"
          disabled={props.request.confirmed ? true : false}
        >
          Confirm
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => handleDelete(props.request.id)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
