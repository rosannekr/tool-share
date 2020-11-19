import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";

export default function Inbox(props) {
  let [messages, setMessages] = useState([]);
  let [input, setInput] = useState("");
  let [user, setUser] = useState("");

  let { sender, receiver } = useParams();

  useEffect(() => {

    setMessages([]);
    getMessages();
    getUser()
    

    Pusher.logToConsole = true;

    var pusher = new Pusher("2985b7ef897701726d64", {
      cluster: "eu",
      forceTLS: true,
    });

    const ids = [sender, receiver].sort();
    const channelName = `chat-${ids[0]}-${ids[1]}`;

    var channel = pusher.subscribe(channelName);
    channel.bind("message", function (data) {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [receiver, sender]);

  const sendMessage = async () => {
    axios.post(`/chat/${sender}/${receiver}`, {
      data: { message: input },
    });

    setInput("");
  };

  const getUser = async () => {
    const res = await axios.get(`/users/${sender}`);
    setUser(res.data);
  };

  const getMessages = async () => {
    let { data } = await axios(`/chat/${sender}/${receiver}`);

    setMessages((messages) => [...messages, ...data]);
    console.log(messages[0])
  };

  return (
    <div className="d-flex mt-5 flex-col h-full rounded-md pt-5 fixed bottom-0 w-screen">
      <div className="absolute mt-3 py-2 flex justify-between">
        <div className="flex text-white items-center gap-1 px-3 bg-indigo-500 w-screen py-4 mt-20">
        <Link to={`/messages/${receiver}`}><i className="fas fa-chevron-left"></i></Link>
         { user && <img
            alt="Placeholder"
            className="block rounded-full h-8 w-8 object-cover"
            src={`/../../../${user.picture.substring(7, user.picture.length)}`}
          />}
         {user && <p>{user.name}</p>}
        </div>
      </div>
      <div className="flex-grow-1 px-5 mt-32">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender_id == sender ? "text-right mt-3" : "text-left mt-3"
            }
          >
            <div className="mt-6">
              <span
                className={`py-2 px-1  rounded text-white ${
                  message.sender_id == sender
                    ? "bg-indigo-400"
                    : "bg-gray-500"
                }`}
              >
                {message.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-top">
        <div className="flex flex-col space-evenly h-1/6">
        
        <div className="flex flex-row pt-64 pb-3 px-4 ">

        <input 
            id="title"
            type="text"
            className="form-control mr-1 border rounded border-gray-500 w-screen pb-8 px-3" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
       
            <button onClick={sendMessage} className="btn btn-primary">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
         </div>
        </div>
      </div>
    </div>
  );
}
