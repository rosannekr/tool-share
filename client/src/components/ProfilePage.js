import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";
import ProductGrid from "./ProductGrid";
import AddProduct from "./AddProduct";

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
          <h2>My Profile</h2>
          <p>Name: {user.name}</p>
          <p>Points: {user.points || 0}</p>
          <h5>My Products:</h5>
          {/* <ProductGrid products={user.Products} /> */}
          <AddProduct userId={user.id} />
        </div>
      )}
    </div>
  );
}
