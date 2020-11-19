import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { getCategories } from "../services/requests";

export default function Filters() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [condition, setCondition] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [distance, setDistance] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Get parsed params from url
    const parsed = queryString.parse(history.location.search);

    setSortBy(parsed.sort_by);
    setCondition(parsed.condition);
    setCategoryId(parsed.category_id);
    setDistance(parsed.distance);
    setFilters(parsed);

    // Get categories
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

  // Get user location
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
      }
    );
  };

  // Store filters

  const handleSelect = (e) => {
    const parsed = queryString.parse(location.search);

    // Delete search word from filters if it's not in the query string
    if (filters.q && !parsed.q) {
      filters.q = "";
    }

    // Grab selected values
    const { name, value } = e.target;

    // Ask location if distance filters are used
    if (name === "location" && value === "userLocation") {
      getUserLocation();
    } else {
      // Save selected value in filters
      setFilters({ ...filters, [name]: value });

      switch (name) {
        case "category_id":
          setCategoryId(value);
          break;
        case "condition":
          setCondition(value);
          break;
        case "distance":
          setDistance(value);
          break;
        case "sort_by":
          setSortBy(value);
          break;
      }
    }
  };

  // Fetch filtered products

  useEffect(() => {
    const queryParams = queryString.stringify(filters, {
      skipEmptyString: true,
    });

    history.push(`/search?${queryParams}`);
  }, [filters]);

  // Reset filters

  const resetFilters = () => {
    setCategoryId("");
    setCondition("");
    setSortBy("");
    setDistance("");
    setFilters({
      ...filters,
      category_id: "",
      condition: "",
      sort_by: "",
      distance: "",
    });
  };

  return (
    <div className="py-3 pl-10">
      <select
        className="w-64 border shadow-sm p-2 mr-3 rounded-full focus:outline-none"
        name="category_id"
        onChange={handleSelect}
        value={categoryId}
      >
        <option value="">Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className="w-64 border shadow-sm p-2 mr-2 rounded-full focus:outline-none"
        name="distance"
        onChange={handleSelect}
        value={distance}
      >
        <option value="">Distance</option>
        <option value="5000">Up to 5 km</option>
        <option value="10000">Up to 10 km</option>
        <option value="30000">Up to 30 km</option>
        <option value="50000">Up to 50 km</option>
      </select>
      <select
        className="w-64 border shadow-sm p-2 mr-3 rounded-full focus:outline-none"
        name="condition"
        onChange={handleSelect}
        value={condition}
      >
        <option value="">Item condition</option>
        <option value="new">New</option>
        <option value="as good as new">As Good As New</option>
        <option value="good">Good</option>
        <option value="acceptable">Acceptable</option>
      </select>
      <select
        className="w-64 border shadow-sm p-2 mr-2 rounded-full focus:outline-none"
        name="sort_by"
        onChange={handleSelect}
        value={sortBy}
      >
        <option value="">Sort by</option>
        <option value="newest">Newest</option>
        <option value="distance">Distance</option>
      </select>
      <select
        className="w-64 border shadow-sm p-2 mr-2 rounded-full focus:outline-none"
        name="location"
        onChange={handleSelect}
        // value={sortBy}
      >
        <option value="">Location</option>
        <option value="userLocation">Use my location</option>
        {/* <option value="distance">Distance</option> */}
      </select>
      <button
        onClick={resetFilters}
        className="ml-3 text-indigo-400 focus:outline-none"
      >
        Reset
      </button>
    </div>
  );
}
