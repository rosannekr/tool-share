import React, { useState, useEffect } from "react";
import { getCategories, addProduct } from "../services/requests";

export default function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

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
      await addProduct(name, description, price, categoryId);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          onChange={(e) => setPrice(e.target.value)}
          value={price}
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
        <button className="btn btn-primary mt-2" onClick={handleClick}>
          Add
        </button>
      </form>
    </div>
  );
}
