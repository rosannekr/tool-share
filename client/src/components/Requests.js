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

  const pending = requests
    .filter((request) => !request.confirmed)
    .map((request) => (
      <RequestCard key={request.id} request={request} fetchData={fetchData} />
    ));

  const confirmed = requests
    .filter((request) => request.confirmed)
    .map((request) => (
      <RequestCard key={request.id} request={request} fetchData={fetchData} />
    ));

  return (
    <div className="container text-center mt-5">
      <div className="d-inline-block">
        <h2>My Requests</h2>
        <hr className="mb-0" />
        {pending.length ? (
          <div>{pending}</div>
        ) : (
          <span className="d-inline-block mt-2">No pending requests</span>
        )}
        <div className="mt-5">
          <h4>Confirmed</h4>
          <hr className="mb-0" />
          {confirmed.length ? (
            <div>{confirmed}</div>
          ) : (
            <span className="d-inline-block mt-2">No confirmed requests</span>
          )}
        </div>
      </div>
    </div>
  );
}
