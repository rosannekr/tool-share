import React from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { useHistory } from "react-router-dom";
import CategoryNav from "./CategoryNav";

export default function Header(props) {
  let history = useHistory();

  if (
    history.location.pathname === "/login" ||
    history.location.pathname === "/register"
  ) {
    return null;
  } else {
    return (
      <div className="container">
        <SearchBar callback={(products) => props.callback(products)} />
        <Filters callback={(products) => props.callback(products)} />
      </div>
    );
  }
}
