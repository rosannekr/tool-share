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
    <div className="w-2/5 mx-auto pt-8">
      <h2 className="font-medium text-2xl mb-3 text-center">My Requests</h2>
      {pending.length ? (
        <div>{pending}</div>
      ) : (
        <span className="inline-block mt-2">No pending requests</span>
      )}
      <div className="mt-5">
        <h4 className="font-medium text-xl mb-3 text-center">Confirmed</h4>
        {confirmed.length ? (
          <div>{confirmed}</div>
        ) : (
          <span className="inline-block mt-2">No confirmed requests</span>
        )}
      </div>
    </div>
  );
}
