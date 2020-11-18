import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";

export default function Chat({ sender, receiver, name, photo, close }) {
  let [messages, setMessages] = useState([]);
  let [input, setInput] = useState("");

  useEffect(() => {
    setMessages([]);
    getMessages();

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

  const getMessages = async () => {
    let { data } = await axios(`/chat/${sender}/${receiver}`);

    setMessages((messages) => [...messages, ...data]);
  };

  return (
    <div className="d-flex flex-column h-100 w-100 border rounded-md pt-5">
      <div className="absolute top-0 bg-indigo-700 w-100 py-2 flex justify-between">
        <div className="flex text-white items-center gap-1 px-3">
          <img
            alt="Placeholder"
            className="block rounded-full h-8 w-8 object-cover"
            src={`/../../../${photo.substring(7, photo.length)}`}
          />
          {name}
        </div>

        <i
          className="fa fa-times text-white pr-2 items-center cursor"
          aria-hidden="true" onClick={close}
        ></i>
      </div>
      <div className="flex-grow-1 px-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender_id == sender ? "text-right mt-3" : "text-left mt-3"
            }
          >
            <div className="">
              <span
                className={`py-2 px-1 mt-3 rounded text-white ${
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

      <div className="bg-light p-4 border-top">
        <div className="flex flex-column space-evenly">
        
        <div className="flex flex-row">


        <input 
            id="title"
            type="text"
            className="form-control mr-1"
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
