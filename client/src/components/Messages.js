import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getProfile} from "../services/requests";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

export default function Messages() {
  const [messages, setMessages] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");
  const [receiver, setReceiver] = useState("");
  let { id } = useParams();


  useEffect(() => {
    getAllMessages();
    fetchData();
  }, []);

  const fetchData = async () => {
    // Get owner and product data
    const res1 = await getProfile();
    setUser(res1.data);
  }

    //open and close chat pop up

    let showPopUp = (id) => {

      setShow(true);
    };
  
    let hidePopUp = (id) => {
  
      setShow(false);
    };

    let managePopUp = (id) => {
      setReceiver(id)
      showPopUp()
    }

    const getAllMessages = async () => {
      const res = await axios.get(`/chat/messages/${id}`);
      setMessages(res.data);
    };

  return (
    <div>

      <ul className="px-5 py-5">
        <li className="border list-none rounded-sm px-3 py-3 bg-indigo-400 text-white text-center cursor ">
          Inbox <i class="fa fa-inbox" aria-hidden="true"></i>
        </li>
        {messages &&
          messages.map((message) => (
          <Link to={`/inbox/${message.sender_id}/${user.id}`}>
            <li className="border list-none rounded-sm px-3 py-3 mb-64" onClick={managePopUp}>
              <div className="flex flex-row justify-center gap-2">
                {" "}
                
                <img
                  alt="Placeholder"
                  className="block rounded-full h-8 w-8 object-cover text-center"
                  src={`/../../../${message.sender.picture.substring(
                    7,
                    message.sender.picture.length
                  )}`}
                />{" "}
                <p>{message.sender.name} said on {format(new Date(message.createdAt), "MMM dd")}:</p>
              </div>{" "}
            

                <p className="text-center">{message.text}</p>
              
            </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
