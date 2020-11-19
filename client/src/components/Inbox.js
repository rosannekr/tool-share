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
 
         <div className="d-flex flex-column h-100 border border-gray-700 bg-gray-200 mx-64 rounded-md mt-32">
 
             <div className="absolute w-auto py-2 flex justify-between">
       <div className="flex text-indigo-700 items-center gap-1 px-3">
       <Link to={`/messages/${receiver}`}><i className="fas fa-chevron-left text-indigo-700"></i></Link>
        { user && <img
           alt="Placeholder"
           className="block rounded-full h-8 w-8 object-cover border border-indigo-700"
           src={`/../../../${user.picture.substring(7, user.picture.length)}`}
         />}
        {user && <p className="underline">{user.name}</p>}
       </div>
       </div> 
 
 
 
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
                     message.sender_id == sender ? "bg-indigo-400" : "bg-bg-gray-300"
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
               className="form-control border border-gray-400 w-screen"
               value={input}
               onChange={e => setInput(e.target.value)}
               onKeyPress={e => {
                 if (e.key === "Enter") sendMessage();
               }}
             />
               <button onClick={sendMessage} className="btn btn-primary">
                 Send
               </button>
     
         </div>
       </div>
 
 
 
 );
}



      {/* <Link to={`/messages/${receiver}`}><i className="fas fa-chevron-left"></i></Link>
         { user && <img
            alt="Placeholder"
            className="block rounded-full h-8 w-8 object-cover"
            src={`/../../../${user.picture.substring(7, user.picture.length)}`}
          />} */}
