import React, { useState, useEffect } from "react";
import axios from 'axios';

import Noty from "noty";
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/relax.css";

export default function UpdatePicture({
  handleClose,
  show,
  userID,
  callback1,
  callback2,
}) {

  

  const showHideClassName = show ? "relative inset-0 h-full w-full cursor-default bg-indigo-300 block" : "relative inset-0 h-full w-full cursor-default bg-black hidden";

  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let notification = (str) => {
    new Noty({
      text: str,
      layout: "topRight",
      theme: "relax",
      type: "success",
      timeout: 3500,
      progressBar: true,
    }).show();
  };

  let editPicture = () => {
    let id = userID;
    setLoading(true);

    const data = new FormData();
    data.append("picture", picture);

    axios
      .put(`http://localhost:5000/users/${id}/pic`, data)
      .then((res) => window.location.reload())
      .then((res) => setLoading(false))
      //.then((res) => callback2(true))
      //.then((res) => window.location.reload())
      .catch((err) => console.log(err));

    notification("your profile picture was updated correctly");
    callback1();
    callback2(true);
  };

  const fileSelectedHandler = (event) => {
    setPicture(event.target.files[0]);
  };

  return (
    <div className={showHideClassName}>
      <section className="  mr-4 relative z-10 ">
        <p className="text-right" onClick={handleClose}>
          <i
            className="fa fa-times mr-2 text-danger cursor"
            aria-hidden="true"
          ></i>
        </p>

        <div className="form text-center">
          {loading && (
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
          {loaded && (
            <p className="text-success">Your product was correctly uploaded</p>
          )}
          <h5 className="font-semibold">Upload a new picture</h5>

          <input
            type="file"
            onChange={fileSelectedHandler}
            lang="en"
            className="form-control-file text-center ff mt-3 mb-3 w-3/5 px-6"
          />

          <button className="btn btn-primary btn-block ml-3" onClick={editPicture}>
            Update item
          </button>
        </div>
      </section>
    </div>
  );
}
