import React, { useState, useEffect } from "react";
import { getCategories, addProduct } from "../services/requests";
import { getProfile } from "../services/requests";
import axios from "axios";

export default function AddProduct(props) {
  const [userId, setUserId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [condition, setCondition] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [NumOfDaysAvailable, setNumOfDaysAvailable] = useState(0);
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

  const send = (event) => {
    event.preventDefault();

    setLoading(true);

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("pricePerDay", pricePerDay);
    data.append("CategoryId", categoryId);
    data.append("NumOfDaysAvailable", NumOfDaysAvailable);
    data.append("UserId", userId);
    data.append("condition", condition);
    data.append("picture", picture);

    axios
      .post("http://localhost:5000/products", data)
      .then((res) => setLoading(false))
      .then((res) => setLoaded(true))
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // send product info to server
      await addProduct(name, description, pricePerDay, categoryId, picture);
    } catch (error) {
      console.log(error.message);
    }
  };

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
    <div className="text-center mt-3">
      {loading && (
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {loaded && (
        <p className="text-success">Your product was correctly uploaded</p>
      )}
      <h3>Add a new product...</h3>
      <p className="text-muted">
        ...and get 20 free <i className="fas fa-coins"></i>!{" "}
      </p>

      <form className="w-25 mx-auto mt-2">
        <label>What is it?</label>
        <input
          className="form-control mb-1 text-center"
          type="text"
          placeholder="product's name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label className="mt-2">Tell us more things about it!</label>
        <input
          className="form-control text-center"
          type="text"
          placeholder="product's description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <label>In which condition is it?</label>
        <select
          className="form-control text-center"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option className="text-center" value={0}></option>
          <option className="text-center" value="new">
            New
          </option>
          <option className="text-center" value="as good as new">
            As good as new
          </option>
          <option className="text-center" value="good">
            Good
          </option>
          <option className="text-center" value="acceptable">
            Acceptable
          </option>
        </select>

        <label className="mt-2">
          What's its price (in <i className="fas fa-coins"></i>)?
        </label>
        <input
          className="form-control text-center"
          type="number"
          onChange={(e) => setPricePerDay(e.target.value)}
          value={pricePerDay}
        />

        <label className="mt-2">Choose a category</label>
        <select
          className="form-control text-center"
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

        <label className="mt-2">For how long can it be borrowed?</label>
        <input
          className="form-control text-center"
          type="number"
          onChange={(e) => setNumOfDaysAvailable(e.target.value)}
          value={NumOfDaysAvailable}
        />
        <label className="mt-2">Upload a nice picture!</label>
        <input
          type="file"
          onChange={fileSelectedHandler}
          lang="en"
          className="form-control-file text-center"
        />

        <button className="btn btn-primary mt-2 mb-2" onClick={send}>
          Add item
        </button>
      </form>
    </div>
  );
}
