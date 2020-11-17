import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { getCategories } from "../services/requests";

export default function Filters() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const history = useHistory();

  // Get categories

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

  // Store filters

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fetch filtered products

  useEffect(() => {
    const queryParams = queryString.stringify(filters, {
      skipEmptyString: true,
    });
    history.push(`/search?${queryParams}`);
  }, [filters]);

  return (
    <div className="py-3 pl-5">
      <select
        className="w-40 border shadow-sm p-2 mr-3 rounded-full focus:outline-none"
        name="category_id"
        onChange={handleSelect}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className="w-40 border shadow-sm p-2 mr-3 rounded-full focus:outline-none"
        name="condition"
        onChange={handleSelect}
      >
        <option value="">All conditions</option>
        <option value="new">New</option>
        <option value="as good as new">As Good As New</option>
        <option value="good">Good</option>
        <option value="acceptable">Acceptable</option>
      </select>
      <select
        className="w-40 border shadow-sm p-2 mr-2 rounded-full focus:outline-none"
        name="sort_by"
        onChange={handleSelect}
      >
        <option value="">Sort by</option>
        <option value="newest">Newest</option>
        <option value="distance">Distance</option>
      </select>
    </div>
  );
}
