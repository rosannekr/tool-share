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
      console.log(result.data);
      // call login method to set logged in state in App component
      props.login();
      // redirect user to home page after login
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleClick}>Log In</button>
      </form>
    </div>
  );
}

export default Login;