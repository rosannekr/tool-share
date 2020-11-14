<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
=======
import React, { useState, useEffect } from "react";
import axios from 'axios';
>>>>>>> 2737779... small changes

export default function UpdatePicture({
  handleClose,
  show,
  userID,
  callback1,
  callback2,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> 2737779... small changes

  let editPicture = () => {
    let id = userID;
    setLoading(true);

<<<<<<< HEAD
    const data = new FormData();
    data.append("picture", picture);

    axios
      .put(`http://localhost:5000/users/${id}/pic`, data)
      .then((res) => setLoading(false))
      .then((res) => setLoaded(true))
      .catch((err) => console.log(err));
=======
let editPicture = () => {
  
let id = userID
setLoading(true);

    const data = new FormData();
    data.append("picture", picture);
>>>>>>> 2737779... small changes

    axios
      .put(`http://localhost:5000/users/${id}/pic`, data)
      .then((res) => setLoading(false))
      .then((res) => setLoaded(true))
      .catch((err) => console.log(err));

callback1();
callback2(true);

<<<<<<< HEAD
=======
};

 
>>>>>>> 2737779... small changes
  const fileSelectedHandler = (event) => {
    setPicture(event.target.files[0]);
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p className="text-right" onClick={handleClose}>
          <i
            className="fa fa-times mr-2 text-danger cursor"
            aria-hidden="true"
          ></i>
        </p>
<<<<<<< HEAD

        <div className="form text-center">
          {loading && (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {loaded && (
            <p className="text-success">Your product was correctly uploaded</p>
          )}
=======
      
        <div className="form text-center">
        {loading && (
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {loaded && (
        <p className="text-success">Your product was correctly uploaded</p>
      )}
>>>>>>> 2737779... small changes
          <h5>Upload a new picture</h5>

          <input
<<<<<<< HEAD
            type="file"
            onChange={fileSelectedHandler}
            lang="en"
            className="form-control-file text-center ff mt-3 mb-3"
          />

=======
          type="file"
          onChange={fileSelectedHandler}
          lang="en"
          className="form-control-file text-center ff mt-3 mb-3"
        />
        
>>>>>>> 2737779... small changes
          <button className="btn btn-dark btn-block" onClick={editPicture}>
            Update item
          </button>
        </div>
      </section>
    </div>
  );
}
