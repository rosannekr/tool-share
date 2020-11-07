import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../services/requests";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result = await login(username, password);
      // result.data contains user info
      // call login method to set logged in state in App component
      props.login(result.data);
      // redirect user to home page after login
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-center">
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

export default Login;
