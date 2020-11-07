import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/requests";

export default function ProfilePage(props) {
  const [user, setUser] = useState({});
  const { id } = useParams();

  //   Fetch user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(id);
      console.log(result);
      setUser(result.data);
    };
    console.log("id", id);

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
