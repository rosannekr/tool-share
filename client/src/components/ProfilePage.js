import React, { useState, useEffect } from "react";

export default function ProfilePage(props) {
  const [user, setUser] = useState([]);

  // Fetch user data when component mounts
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await getUser();
  //       setData(result.data);
  //     };
  //     fetchData();
  //   }, []);

  return <div>Profile</div>;
}
