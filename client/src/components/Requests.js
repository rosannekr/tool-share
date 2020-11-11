import React, { useState, useEffect } from "react";
import { getRequests } from "../services/requests";
import RequestCard from "./RequestCard";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getRequests();
    setRequests(res.data);
  };

  const content = requests.map((request) => (
    <RequestCard request={request} fetchData={fetchData} />
  ));

  return (
    <div className="container text-center mt-5">
      <h2>My Requests</h2>
      {requests.length ? (
        <div className="d-inline-block">{content}</div>
      ) : (
        "You have no requests"
      )}
    </div>
  );
}
