import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";
import ProductList from "./ProductList";
import BorrowedProductList from "./BorrowedProductList";
import { Link } from "react-router-dom";
import PaymentPopUp from "./PaymentPopUp";
import UpdatePicture from "./UpdatePicture";


export default function ProfilePage(props) {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  let showPopUp = () => {
    setShow(true);
  };

  let hidePopUp = () => {
    setShow(false);
  };

  let changeEditMode = () => {
    setEditMode(!editMode)
  }

  let updatePicture = () => {
    
  }

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
  };

  return (
    <div className="text-center mt-5 ">
   <UpdatePicture
        show={show}
        handleClose={hidePopUp}
        userID={user.id}
        callback1={hidePopUp}
        callback2={() => setUpdate(true)}
      />


      {user && (
        <div>


          <div className="mainProfileDiv">
        
          { user.picture && <img onClick={showPopUp} className="rounded-circle cursor mr-3 profile-pic" src={`/../../../${user.picture.substring(7, user.picture.length)}`} alt="profile-pic" /> } 
        
          <div className = "userInfo"><h2>Hello {user.name}!</h2>
          {editMode ? <div><input className="cursor text-center address-input" type="text" defaultValue="address" /> <button className= "btn  btn-link" onClick={changeEditMode}>ok</button> <button className= "btn btn-link" onClick={changeEditMode}><i class="fa fa-times" aria-hidden="true"></i></button> </div> :
          <p onDoubleClick={changeEditMode} className="cursor text-center address">address</p>}
         
            
            </div>
           
          </div>
        

          <div className="container d-flex justify-content-around mt-4">
            <ProductList />   <BorrowedProductList />
            </div>
        </div>
      )}
    </div>
  );
}

