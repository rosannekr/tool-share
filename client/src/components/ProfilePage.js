import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";
import ProductList from "./ProductList";
import BorrowedProductList from "./BorrowedProductList";
import { Link } from "react-router-dom";

export default function ProfilePage(props) {
  const [user, setUser] = useState({});

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProfile();
      setUser(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="text-center mt-5">
      {user && (
        <div>
          <h2>Hello {user.name}!</h2>
          <div className="d-flex justify-content-center">
            <p>
              {" "}
              You currently have {user.points || 0}{" "}
              <i className="fas fa-coins"></i> |
            </p>
            <Link to="/">Add more</Link>
          </div>

          <div className="container d-flex justify-content-around mt-4">
            <ProductList />

            <BorrowedProductList />
          </div>
        </div>
      )}
    </div>
  );
}
