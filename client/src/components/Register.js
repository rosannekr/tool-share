import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../services/requests";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await register(name, username, password);
      // redirect user to login page after signing up
      history.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
        <button onClick={handleClick}>Register</button>
      </form>
    </div>
  );
}

export default Register;
