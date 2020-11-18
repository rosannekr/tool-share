import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { getCategories } from "../services/requests";

export default function Filters() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [condition, setCondition] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Get parsed params from url
    const parsed = queryString.parse(history.location.search);

    setSortBy(parsed.sort_by);
    setCondition(parsed.condition);
    setcategoryId(parsed.category_id);
    setFilters(parsed);

    // Get categories
    fetchData();

    // Get the user's position coords (default is Madrid)
    if (!parsed.lat) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("here");
          const { latitude, longitude } = position.coords;
          setFilters({
            ...filters,
            lat: latitude.toFixed(5),
            lng: longitude.toFixed(5),
          });
        },
        (error) => {
          alert(`Sorry, no location available.`);
          console.log(`ERROR(${error.code}): ${error.message}`);
          // Set default location values (Madrid)
          setFilters({
            ...filters,
            lat: 40.41678,
            lng: -3.70379,
          });
        }
      );
    }
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
        value={categoryId}
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
        value={condition}
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
        value={sortBy}
      >
        <option value="">Sort by</option>
        <option value="newest">Newest</option>
        <option value="distance">Distance</option>
      </select>
    </div>
  );
}
