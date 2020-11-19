import React, { useState, useEffect } from "react";
import { getRequest } from "../services/requests";
import { format } from "date-fns";
import StarRatingComponent from "react-star-rating-component";

export default function ReviewCard(props) {
  const [request, setRequest] = useState({});
  const [borrower, setBorrower] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await getRequest(props.request.id);
        setRequest(request.data);
        setBorrower(request.data.User);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-2 p-3 flex shadow rounded">
      <div className="ml-3 mr-5">
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
        <div className="text-gray-600 text-sm">
          {new Date(request.startDate).toLocaleDateString()}
        </div>

        <StarRatingComponent
          name={request.id}
          starCount={5}
          value={request.rating}
          editing={false}
        />
        <div className="mt-0">{request.review}</div>
      </div>
    </div>
  );
}
