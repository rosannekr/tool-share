import React from "react";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import { Link } from "react-router-dom";


export default function Header(props) {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-2">
        <Link className="navbar-brand ml-4" to="/">
          Home
        </Link>

        <div className="collapse navbar-collapse">
          <SearchBar callback={(products) => props.callback(products)} />
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
                  <Link className="dropdown-item" to="/products/upload">
                    Add a product
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
