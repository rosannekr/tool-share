import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        // if user is authenticated return child component
        return localStorage.getItem("token") ? (
          children
        ) : (
          // else redirect user to login page
          <Redirect
            to={{
              pathname: "/login",
              // state: { from: props.location },
            }}
          />
        );
      }}
    ></Route>
  );
}
