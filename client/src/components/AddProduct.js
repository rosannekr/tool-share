import React, { useState, useEffect } from "react";
import { getCategories } from "../services/requests";
import { getProfile } from "../services/requests";
import axios from "axios";

import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/relax.css";  

export default function AddProduct(props) {
  const [userId, setUserId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [condition, setCondition] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [numOfDaysAvailable, setNumOfDaysAvailable] = useState(0);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getProfile();
    setUser(res.data);
    setUserId(res.data.id);
  };


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

  const send = (event) => {
    event.preventDefault();

    setLoading(true);

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("pricePerDay", pricePerDay);
    data.append("CategoryId", categoryId);
    data.append("numOfDaysAvailable", numOfDaysAvailable);
    data.append("UserId", userId);
    data.append("condition", condition);
    data.append("picture", picture);

    axios
      .post("http://localhost:5000/products", data)
      .then((res) => setLoading(false))
      .then((res) => setLoaded(true))
      .then((res) => notification("your product was correctly uploaded"))
      .catch((err) => console.log(err));

    addPoints();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategories();
      setCategories(res.data);
    };
    fetchData();
  }, []);

  const fileSelectedHandler = (event) => {
    setPicture(event.target.files[0]);
  };

  let addPoints = () => {
    let newPoints = user.points + 20;

    fetch(`/users/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        points: newPoints,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="from-blue-600 to-purple-500 bg-gradient-to-r text-center mt-20 mx-64 py-3 border rounded-lg">
      {loading && (
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {/* {loaded && (
        <p className="text-success">Your product was correctly uploaded</p>
      )} */}
      <h3>Add a new product...</h3>
      <p className="text-white">
        ...and get 20 free <i className="fas fa-coins"></i>!{" "}
      </p>

      <form className="w-25 mx-auto mt-2 flex flex-col justify-center">

      <div class="flex flex-wrap -mx-2 overflow-hidden">

<div class="my-2 px-2 w-full overflow-hidden">
<div className="flex flex-row justify-center gap-2">
        <div className="flex flex-col items-bottom mt-2">
        <label>What is it?</label>
        <input
          className="form-control mb-1 text-center border rounded  border-gray-700"
          type="text"
          placeholder="product's name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        </div>

        <div className="flex flex-col">
        <label className="mt-2">Tell us more things about it!</label>
        <input
          className="form-control text-center border rounded  border-gray-700"
          type="text"
          placeholder="product's description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        </div>
        </div>
</div>

<div class="my-2 px-2 w-full overflow-hidden">
 
<div className="flex flex-row justify-center gap-2">
        <div className="flex flex-col">
        <label>Condition?</label>
        <select
          className="text-center border rounded w-40 py-1 mt-1  border-gray-700"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option className="text-center" value={0}></option>
          <option className="text-center" value="new">
            New
          </option>
          <option className="text-center border rounded  border-gray-700" value="as good as new">
            As good as new
          </option>
          <option className="text-center" value="good">
            Good
          </option>
          <option className="text-center" value="acceptable">
            Acceptable
          </option>
        </select>
        </div>

        <div className="flex flex-col">
        <label className="mt-2">
          What's its price (in <i className="fas fa-coins"></i>)?
        </label>
        <input
          className="form-control text-center border rounded  border-gray-700"
          type="number"
          onChange={(e) => setPricePerDay(e.target.value)}
          value={pricePerDay}
        />
        </div>
        </div>
</div>

<div class="my-2 px-2 w-full overflow-hidden">
<div className="flex flex-row justify-center gap-2">
  <div className="flex flex-col">

        <label className="mt-2">Choose a category</label>
        <select
          className="form-control text-center border rounded w-40  border-gray-700"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option className="text-center" value={0}></option>
          {categories?.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="text-center"
            >
              {category.name}
            </option>
          ))}
        </select>
        </div>

        <div className="flex flex-col">
        <label className="mt-2">Max days available</label>
        <input
          className="form-control text-center border rounded  w-40 border-gray-700"
          type="number"
          onChange={(e) => setNumOfDaysAvailable(e.target.value)}
          value={numOfDaysAvailable}
        />
        </div>
</div>

</div>

<div class="my-2 px-2 w-full overflow-hidden">
<div className="flex flex-col justify-center">
        <label className="mt-2">Upload a nice picture!</label>
        <input
          type="file"
          onChange={fileSelectedHandler}
          lang="en"
          className="block my-auto mx-auto mt-1 mb-2"
        />
        </div>
</div>

</div>

        <button className="btn btn-primary block my-auto mx-auto " onClick={send}>
          Add item
        </button>
      </form>





      
    </div>
  );
}
