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
      await updateRequest(id, { confirmed: true });
      // add points to user
      await updatePoints(points);
    } catch (error) {
      console.log(error);
    }
    props.fetchData();
  };

  return (
    <div className="mb-2">
      <div className="p-3 flex justify-between shadow rounded">
        <div className="flex">
          <div className="mr-3 text-center">
            <div>{borrower.name}</div>
            {borrower.picture && (
              <img
                src={`/../../../${borrower.picture.substring(
                  7,
                  borrower.picture.length
                )}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>

          <div className="text-left">
            <span className="text-xs text-gray-700">
              {new Date(props.request.createdAt).toLocaleDateString()}
            </span>
            <div className="">
              <span>{product.name}</span>
              <span className="p-2">•</span>
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
        </div>

        <div className="self-center">
          {!props.request.confirmed && (
            <div>
              <button
                onClick={() => handleConfirm(props.request.id)}
                className="btn btn-primary mr-2"
              >
                Accept
              </button>
              <button
                className="btn btn-outline"
                onClick={() => handleDelete(props.request.id)}
              >
                Cancel
              </button>
            </div>
          )}
          {props.request.confirmed && (
            <button className="btn btn-primary mr-2">Confirm pickup</button>
          )}
        </div>
      </div>
    </div>
  );
}
