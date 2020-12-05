import React, { useState, useEffect } from "react";
import { getConversations } from "../services/requests";
import { Link, Route } from "react-router-dom";
import Messages from "./Messages";

export default function Inbox() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getConversations();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 pt-12 h-screen border">
      <div className="w-screen py-5 text-center title">My Messages</div>
      <div
        className="grid grid-cols-4 border"
        style={{ height: `calc(100% - 90px)` }}
      >
        <div className="col-start-1 col-end-2 border">
          {users &&
            users.map((user) => (
              <div
                key={user.id}
                className={`pl-6 py-3 border ${
                  user.id == activeUser
                    ? "bg-indigo-400 text-white"
                    : "bg-white"
                }`}
                onClick={() => setActiveUser(user.id)}
              >
                <Link to={`/inbox/${user.id}`}>
                  <div className="flex items-center">
                    <img
                      alt="Placeholder"
                      className="block border rounded-full mr-6 h-10 w-10 object-cover text-center"
                      src={user.picture.substring(0, 5) === "https"
                      ? user.picture
                      : `/../../../${user.picture.substring(
                        7,
                        user.picture.length
                      )}`}
                    />
                    <p>{user.name}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="col-start-2 col-end-4 border">
          <Route path="/inbox/:receiver_id">
            <Messages />
          </Route>
        </div>
        <div className="col-start-4 col-end-5 border"></div>
      </div>
    </div>
  );
}
