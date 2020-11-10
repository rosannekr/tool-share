import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRange(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChangeStart = (date) => {
    setStartDate(date);
    props.changeStartDate(date);
  };

  const handleChangeEnd = (date) => {
    setEndDate(date);
    props.changeEndDate(date);
  };

  return (
    <div className="my-2">
      <h4>Select dates</h4>
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
          placeholderText="from"
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
          placeholderText="to"
        />
      </div>
    </div>
  );
}
