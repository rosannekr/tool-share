import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, eachDayOfInterval } from "date-fns";
import { getProductRequests } from "../services/requests";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRange(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [excludedDates, setExcludedDates] = useState([]);

  const handleChangeStart = (date) => {
    setStartDate(date);
    props.changeStartDate(date);
  };

  const handleChangeEnd = (date) => {
    setEndDate(date);
    props.changeEndDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reserved dates
        const res = await getProductRequests(props.productId);

        // Map reservations to date intervals
        const intervals = res.data.map((reservation) =>
          eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate),
          })
        );
        // Make reserved dates unavailable in calendar
        setExcludedDates(intervals.flat());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="my-2">
      <div className="d-flex justify-content-center">
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleChangeStart(date)}
          isClearable
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          excludeDates={excludedDates}
          placeholderText="from"
          className="border-2 rounded p-1 focus:outline-none focus:border-gray-500"
        />
        <DatePicker
          selected={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleChangeEnd(date)}
          isClearable
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={addDays(startDate, props.maxAvailableDays)}
          excludeDates={excludedDates}
          placeholderText="to"
          className="border-2 rounded p-1 focus:outline-none focus:border-gray-500"
        />
      </div>
    </div>
  );
}
