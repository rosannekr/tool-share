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
    <div className="text-center mt-4 ">

      <UpdatePicture
        show={show}
        handleClose={hidePopUp}
        userID={user.id}
        callback1={hidePopUp}
        callback2={() => setUpdate(true)}
      />

      {user && (
        <div>
          <div className="mainProfileDiv py-4 flex justify-center gap-4 bg-indigo-100">
            {user.picture && (
              <img
                onClick={showPopUp}
                className="rounded-full cursor w-32 h-32 self-center object-fit hover:opacity-75"
                src={`/../../../${user.picture.substring(
                  7,
                  user.picture.length
                )}`}
                alt="profile-pic"
              />
            )}

            <div className=" flex flex-col justify-around">
              <h2 className="title">Hi there, {user.name}!</h2>
              {!user.address ? 
                <p>let us know the location of your products!</p> : <p>your products location:</p>
              }
              <div className="flex">
                <input
                  className="cursor text-center border-b-2 border-black border-dotted w-100 bg-indigo-100"
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
            <h3 className="text-2xl text-black font-bold mt-5">- Your dashboard -</h3>
          <div className="container flex justify-around mt-4">
            <ProductList /> <BorrowedProductList id={user.id} />
          </div>
        </div>
      )}

    </div>
  );
}
