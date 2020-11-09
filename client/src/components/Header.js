import React from "react";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
        <Link className="navbar-brand ml-3" to="/">
          Home
        </Link>

        <div className="collapse navbar-collapse">
          <SearchBar callback={(products) => props.callback(products)} />
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
        </div>
      </nav>

      <CategoryNav callback={(products) => props.callback(products)} />
    </div>
  );
}
