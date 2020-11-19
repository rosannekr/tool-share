import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/requests";

export default function LandingPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen text-gray-900">
      <div
        className="w-screen overflow-hidden relative"
        style={{ height: "400px" }}
      >
        <img
          className="w-full h-full object-cover"
          src="/../../../pictures/cover.jpg"
        />
        <div className="absolute top-0 mt-12 ml-48 z-10">
          <h1 className="text-5xl font-semibold font-serif">
            Buy less, <br /> share more.
          </h1>
          <h5 className="text-xl mb-2">
            Instantly borrow stuff from <br />
            your neighbours.
          </h5>
          <Link
            className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white text-lg font-semibold px-8 py-2 mt-3 rounded"
            to="/how-it-works"
          >
            Learn more
          </Link>
        </div>
      </div>

      <div className="pt-10">
        <h2 className="text-center text-3xl font-semibold font-serif">
          What are you looking for?
        </h2>
        <div className="flex flex-wrap justify-around mt-10 text-xl text-gray-600 font-serif">
          <Link to="/search" className="hover:text-indigo-700">
            All categories
          </Link>
          {categories.map((category) => (
            <Link
              className="hover:text-indigo-700"
              to={`/search?category_id=${category.id}`}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
