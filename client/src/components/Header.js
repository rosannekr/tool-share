import React, { useState, useEffect } from "react";
import { getProfile, updatePoints } from "../services/requests";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import PaymentDropdown from "./PaymentDropdown";
import AccountDropdown from "./AccountDropdown";

export default function Header(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, [props.isLoggedIn]);

  const addPoints = async (amount) => {
    await updatePoints(+amount);
    fetchData();
  };

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
  };

  return (
    <div className="relative z-10">
      <nav className="py-2 px-4 flex justify-between items-center w-screen bg-indigo-700 text-white">
        <Link className="px-5 text-lg font-semibold hover:text-gray-400" to="/">
          <div className="flex flex-row ">
            <img
              className="w-24 landing-picture"
              src="/../../../pictures/logo.png"
            />
            <i class="fa fa-wrench ml-2 mt-2" aria-hidden="true"></i>
          </div>
        </Link>

        <SearchBar />

        <div className="flex items-center">
          {user && (
            <PaymentDropdown points={user.points} addPoints={addPoints} />
          )}

          {!props.isLoggedIn && (
            <div className="flex">
              <Link
                className="btn btn-primary hover:bg-white hover:text-indigo-700"
                to="/login"
              >
                Log In
              </Link>

              <Link
                className="btn btn-primary hover:bg-white hover:text-indigo-700 ml-2"
                to="/register"
              >
                Sign Up
              </Link>
            </div>
          )}
          {props.isLoggedIn && user && (
            <AccountDropdown logout={props.logout} id={user.id} />
          )}
        </div>
      </nav>
    </div>
  );
}