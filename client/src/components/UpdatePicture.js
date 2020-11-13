import React, { useState, useEffect } from "react";


export default function UpdatePicture({
  handleClose,
  show,
  userId,
  callback1,
  callback2,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [picture, setPicture] = useState(false);


  let editPicture= async (event) => {
  
console.log("hola")

    // try {
    //   await update(id, {
        
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    callback1();
    callback2(true);
  };


  const fileSelectedHandler = (event) => {
    setPicture(event.target.files[0]);
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p className="text-right" onClick={handleClose}>
          <i class="fa fa-times mr-2 text-danger cursor" aria-hidden="true"></i>
        </p>
      
        <div className="form">
          <h5>Upload a new picture</h5>
       
          <input
          type="file"
          onChange={fileSelectedHandler}
          lang="en"
          className="form-control-file text-center"
        />
        
          <button className="btn btn-dark btn-block" onClick={editPicture}>
            Update item
          </button>
          </div>
          </section>
    </div>
     
    
  );
}
