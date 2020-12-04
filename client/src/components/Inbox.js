import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import { getMessages, getProfile, sendMessage } from "../services/requests";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState("");
  const { receiver_id } = useParams();

  useEffect(() => {
    setMessages([]);
    fetchData();

    Pusher.logToConsole = true;

    const pusher = new Pusher("2985b7ef897701726d64", {
      cluster: "eu",
      forceTLS: true,
    });

    const ids = [sender, receiver_id].sort();
    const channelName = `chat-${ids[0]}-${ids[1]}`;

    var channel = pusher.subscribe(channelName);
    channel.bind("message", function (data) {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [receiver_id]);

  const send = async () => {
    try {
      await sendMessage(input, receiver_id);
    } catch (error) {
      console.log(error);
    }

    setInput("");
  };

  const fetchData = async () => {
    try {
      const res = await getMessages(receiver_id);
      setMessages((messages) => [...messages, ...res.data]);

      const res1 = await getProfile();
      setSender(res1.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-end bg-gray-200">
      <div className="p-3 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.sender_id != receiver_id
                ? "text-right my-2"
                : "text-left my-2"
            }
          >
            <div className="">
              <span
                className={`px-2 py-1 rounded text-white ${
                  message.sender_id != receiver_id
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

      <div className="from-blue-300 to-purple-300 bg-gradient-to-r p-4 border-top flex flex-row ">
        <input
          type="text"
          className="pl-3 border border-gray-400 w-full rounded focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <button onClick={send} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}
