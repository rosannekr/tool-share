import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";
import ProductList from "./ProductList";
import BorrowedProductList from "./BorrowedProductList";
import UpdatePicture from "./UpdatePicture";

export default function ProfilePage(props) {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    fetchData();
  }, [update]);

  let showPopUp = () => {
    setShow(true);
  };

  let hidePopUp = () => {
    setShow(false);
  };

  let changeEditMode = () => {
    setEditMode(!editMode);
  };

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
    setAddress(res.data.address)
  };

  const addressSubmit = (event) => {
    event.preventDefault();
    const id = user.id;


    fetch(`/users/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        address: address,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


    changeEditMode();
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
            {user.picture && (
              <img
                onClick={showPopUp}
                className="rounded-circle cursor mr-3 profile-pic"
                src={`/../../../${user.picture.substring(
                  7,
                  user.picture.length
                )}`}
                alt="profile-pic"
              />
            )}

            <div className="userInfo">
              <h2>Hi there, {user.name}!</h2>
              {!user.address ? 
                <p>let us know the location of your products!</p> : <p>your products location:</p>
              }
              <div>
                <input
                  className="cursor text-center address-input"
                  type="text"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onClick={changeEditMode}
                />
                {editMode && (
                  <button className="btn  btn-link" onClick={addressSubmit}>
                    <i className="fas fa-check-circle"></i>
                  </button>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="container d-flex justify-content-around mt-4">
            <ProductList /> <BorrowedProductList />
          </div>
        </div>
      )}
    </div>
  );
}
