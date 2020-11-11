import React, { useState, useEffect } from "react";
import {
  getProduct,
  getUser,
  deleteRequest,
  updateRequest,
} from "../services/requests";

export default function RequestCard(props) {
  const [product, setProduct] = useState({});
  const [borrower, setBorrower] = useState({});

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
      await updateRequest(id, 1);
    } catch (error) {
      console.log(error);
    }
    props.fetchData();
  };

  return (
    <div className="border p-3 d-flex justify-content-between">
      <div className="text-left">
        <small>{new Date(props.request.createdAt).toLocaleDateString()}</small>
        <div>
          <span>{product.name} | </span>
          <span>
            {new Date(props.request.startDate).toDateString()} -{" "}
            {new Date(props.request.endDate).toDateString()}
          </span>
        </div>
        <div>{borrower.name}</div>
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
