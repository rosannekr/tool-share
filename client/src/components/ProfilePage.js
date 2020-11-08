import React, { useState, useEffect } from "react";
import { getProfile } from "../services/requests";

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
    <div>
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Points: {user.points || 0}</p>
    </div>
  );
}
