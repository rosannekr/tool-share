import React, { useState, useEffect } from "react";
import { getRequests } from "../services/requests";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequests();
      setRequests(res.data);
    };
    fetchData();
  }, []);

  const content = requests.map((request) => <li>{request.ProductId}</li>);

  return (
    <div className="container text-center mt-5">
      <h2>My Requests</h2>
      {content ? <ul>{content}</ul> : "You have no requests yet"}
    </div>
  );
}
