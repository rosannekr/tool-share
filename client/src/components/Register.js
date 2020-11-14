import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../services/requests";

import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/relax.css";  


export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

let notification = (str) => {

  new Noty({
    text: str,
    layout: "topRight",
    theme: "relax",
    type: "success",
    timeout: 3500,
    progressBar: true
  }).show();
   
}


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await register(name, username, password);
      // redirect user to login page after signing up
      history.push("/login");
      notification("Account was created succesfully, please log in")
      //notification("Account created succesfully!")
     
    } catch (error) {
      console.log(error.message);
     
   
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Sign Up</h2>
      <form className="w-25 mx-auto mt-2">
        <input
          className="form-control mb-1"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          Register
        </button>
      </form>
    </div>
  );
}
