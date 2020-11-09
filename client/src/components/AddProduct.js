import React, { useState, useEffect } from "react";
import { getCategories, addProduct } from "../services/requests";
import { getProfile } from "../services/requests";
import axios from "axios";

export default function AddProduct(props) {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [NumOfDaysAvailable, setNumOfDaysAvailable] = useState(0);
  const [picture, setPicture] = useState(null);

  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getProfile();
    setUserId(res.data.id);
  };

  const send = event => {

    event.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("pricePerDay", pricePerDay);
    data.append("CategoryId", categoryId);
    data.append("NumOfDaysAvailable", NumOfDaysAvailable);
    data.append("UserId", userId);
    data.append("picture", picture);

   axios.post("http://localhost:5000/products", data)
   .then(res => console.log(res))
   .catch(err => console.log(err))

  } 

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

  const fileSelectedHandler = event => {
    setPicture(event.target.files[0])
  }



  return (
    <div className="text-center mt-5">
      <h2>Add a new product</h2>
      <form className="w-25 mx-auto mt-2">
        <input
          className="form-control mb-1"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          className="form-control"
          type="number"
          onChange={(e) => setPricePerDay(e.target.value)}
          value={pricePerDay}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value={0}>Choose category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>


        <input
          className="form-control"
          type="number"
          onChange={(e) => setNumOfDaysAvailable(e.target.value)}
          value={NumOfDaysAvailable}
        />

        <input type="file" onChange={fileSelectedHandler} />


        <button className="btn btn-primary mt-2" onClick={send}>
          Add
        </button>
      </form>
    </div>
  );
}
