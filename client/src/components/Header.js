import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/requests";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import { Link } from "react-router-dom";
import PaymentPopUp from "./PaymentPopUp";

export default function Header(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchData();
  }, [props.isLoggedIn]);

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
  };

  const addPoints = (amount) => {
    updateProfile({ points: +amount + user.points });
    fetchData();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
        <Link className="navbar-brand ml-5" to="/">
          Home
        </Link>

        <div className="py-3 collapse navbar-collapse">
          <SearchBar callback={(products) => props.callback(products)} />

          {user && (
            <button
              className="btn"
              data-toggle="modal"
              data-target="#addPointsModal"
            >
              {user.points} <i className="fas fa-coins"></i>
            </button>
          )}
          <PaymentPopUp addPoints={addPoints} />

          {!props.isLoggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
          {props.isLoggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                >
                  My account
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/profile">
                    My profile
                  </Link>
                  <Link className="dropdown-item" to="/requests">
                    My requests
                  </Link>
                  <Link className="dropdown-item" to="/products/upload">
                    Add product
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/" onClick={props.logout}>
                    Log out
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <CategoryNav callback={(products) => props.callback(products)} />
    </div>
  );
}
