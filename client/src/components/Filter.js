import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";

export default function Filter(props) {
  let [categories, setCategories] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    fetch(`/categories`)
      .then((response) => response.json())
      .then((response) => {
      setCategories(response)
      });
  };

  const filterByCategory = (id) => {
    fetch(`categories/${id}/products`)
      .then((response) => response.json())
      .then((response) => {
        response.length > 0 && props.callback(response);
      });
  };

  return (
    <div>
      <ul>
        {categories &&
          categories.map((category) => (
            <Link to="/" key={category.id}><li
              style={{ display: "inline" }}
              onClick={() => filterByCategory(category.id)}
            >
              {category.name}{" "}
            </li></Link>
          ))}
      </ul>
    </div>
  );
}
