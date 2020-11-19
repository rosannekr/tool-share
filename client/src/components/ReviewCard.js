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
   <div className="border-bottom px-5 mt-6 flex flex-row justify-center">
     <div className="mr-3" style={{ height: "20px" }}>
       <div>{borrower.name}</div>
       {borrower.picture && (
         <img
           src={`/../../../${borrower.picture.substring(
             7,
             borrower.picture.length
           )}`}
           className="rounded-circle profile-pic-small"
         />
       )}
     </div>
 
     <div className="text-left">
       <div>
         <small>{new Date(request.startDate).toLocaleDateString()}</small>
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
