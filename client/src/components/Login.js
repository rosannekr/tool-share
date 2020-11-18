import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../services/requests";

import Noty from "noty";
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/relax.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  let notification = (str) => {
    new Noty({
      text: str,
      layout: "topRight",
      theme: "relax",
      type: "error",
      timeout: 3500,
      progressBar: true,
    }).show();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // send username & password to server
      const res = await login(username, password);
      // store token on user's device
      localStorage.setItem("token", res.data.token);
      // call login method to set logged in state in App component
      props.login();
      // redirect user to home page after login
      history.push("/home");
    } catch (error) {
      notification("Invalid username or password");
      history.push("/login");
      console.log(error.message);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Log In</h2>
      <form className="w-25 mx-auto mt-2">
        <input
          className="form-control mb-1"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="btn btn-primary mt-2" onClick={handleClick}>
          Log In
        </button>
      </form>
    </div>
  );
}
