import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [user, setUser] = useState({});

  // Fetch user data when component mounts
  useEffect(() => {
    fetchData();
  }, [props.isLoggedIn]);

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
        <Link className="navbar-brand ml-4" to="/">
          Home
        </Link>

        <div className="collapse navbar-collapse">
          <SearchBar callback={(products) => props.callback(products)} />
          <p>
            {user && (
              <Link to="/">
                <p className="mt-4">
                  {user.points} <i className="fas fa-coins"></i>
                </p>
              </Link>
            )}
          </p>
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
