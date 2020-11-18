import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Messages() {

    const [messages, setMessages] = useState("");
    let {id} = useParams();

    useEffect(() => {
        getAllMessages();
      }, []);

      const getAllMessages = async () => {
        const res = await axios.get(`/chat/messages/${id}`);
        setMessages(res.data)
          };
      



    return (
        <div>
                   <ul className="px-0">
  <li className="border list-none rounded-sm px-3 py-3 bg-indigo-500">Inbox <i class="fa fa-inbox" aria-hidden="true"></i></li>
  {messages && messages.map((message) => (
             <li className="border list-none rounded-sm px-3 py-3" > <Link to={`/chat/${id}/${message.sender_id}`} className="font-bold"> || {message.text}</Link></li>
          ))};
           
           
           </ul>
        </div>
    )
}
