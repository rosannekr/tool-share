import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile, getConversations } from "../services/requests";
import { Link, Route } from "react-router-dom";
import Inbox from "./Inbox";

export default function Messages() {
  const [messages, setMessages] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");
  const [receiver, setReceiver] = useState("");
  const [users, setUsers] = useState([]);
  let { id } = useParams();

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

  //open and close chat pop up

  let showPopUp = (id) => {
    setShow(true);
  };
  let hidePopUp = (id) => {
    setShow(false);
  };

  let managePopUp = (id) => {
    setReceiver(id);
    showPopUp();
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
              <div key={user.id} className="pl-6 py-5 border">
                <Link to={`/messages/${user.id}`}>
                  <div className="flex">
                    <img
                      alt="Placeholder"
                      className="block rounded-full mr-6 h-8 w-8 object-cover text-center"
                      src={`/../../../${user.picture.substring(
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
          <Route path="/messages/:receiver_id">
            <Inbox />
          </Route>
        </div>
        <div className="col-start-4 col-end-5 border"></div>
      </div>
    </div>
  );
}
