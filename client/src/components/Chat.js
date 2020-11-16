import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  let { sender, receiver } = useParams();

  useEffect(() => {
    setMessages([]);


Pusher.logToConsole = true;

var pusher = new Pusher("2985b7ef897701726d64", {
  cluster: "eu",
  forceTLS: true
});

const ids = [sender, receiver].sort();
const channelName = `chat-${ids[0]}-${ids[1]}`;

var channel = pusher.subscribe(channelName);
channel.bind("message", function(data) {
  console.log(data);
  setMessages(messages => [...messages, data]);
});

return () => {
  pusher.unsubscribe(channelName);
};
}, [receiver, sender]);

  const sendMessage = async () => {

    axios.post(`/chat/${sender}/${receiver}`, {
      data: {message: input},
    });

    setInput("");
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 p-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender_id == sender ? "text-right my-2" : "text-left my-2"
            }
          >
            <div className="">
              <span
                className={`px-2 py-1 rounded text-white ${
                  message.sender_id == sender ? "bg-primary" : "bg-secondary"
                }`}
              >
                {message.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-light p-4 border-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <div className="input-group-append">
            <button onClick={sendMessage} className="btn btn-outline-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}