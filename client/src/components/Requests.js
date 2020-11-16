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

  const upcoming = requests
    .filter((request) => request.confirmed)
    .filter((request) => new Date(request.startDate) > new Date())
    .sort((a, b) => {
      if (a.startDate < b.startDate) return -1;
      if (a.startDate > b.startDate) return 1;
      else return 0;
    })
    .map((request) => (
      <RequestCard key={request.id} request={request} fetchData={fetchData} />
    ));

  const past = requests
    .filter((request) => new Date(request.startDate) < new Date())
    .sort((a, b) => {
      if (a.startDate < b.startDate) return -1;
      if (a.startDate > b.startDate) return 1;
      else return 0;
    })
    .map((request) => (
      <RequestCard key={request.id} request={request} fetchData={fetchData} />
    ));

  return (
    <div className="w-full md:w-3/4 lg:w-2/5 mx-auto pt-8">
      <h2 className="font-medium text-3xl mb-3 text-center">My Requests</h2>
      {pending.length ? (
        <div>{pending}</div>
      ) : (
        <div className="mt-2 text-center">No pending requests</div>
      )}
      <div className="mt-5">
        <h4 className="font-medium text-2xl mb-3 text-center">Upcoming</h4>
        {upcoming.length ? (
          <div>{upcoming}</div>
        ) : (
          <div className="mt-2 text-center">No confirmed requests</div>
        )}
      </div>
      <div className="mt-5">
        <h4 className="font-medium text-2xl mb-3 text-center">Past</h4>
        {past.length ? (
          <div>{past}</div>
        ) : (
          <div className="mt-2 text-center">No confirmed requests</div>
        )}
      </div>
    </div>
  );
}
