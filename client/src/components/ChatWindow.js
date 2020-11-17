import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";

export default function ChatWindow({
    handleClose,
    show,
    sender,
    receiver,
    name,
    photo,
    callback1,
    callback2,
  }) 
  
  {
  const showHideClassName = show ? "fixed z-50 display-block right-0 bottom-0" : " fixed z-50 fixed display-none right-0 bottom-0";

  let [item, setItem] = useState("");
  const [productName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numOfDaysAvailable, setNumOfDaysAvailable] = useState(0);
  const [pricePerDay, setPricePerDay] = useState(0);

  useEffect(() => {
  }, []);  

    return (
        <div className={showHideClassName}>
            <div>
                <section className="w-80 h-100 bg-white">
            <Chat sender={sender} receiver={receiver} name={name} photo={photo} close={callback1} />
            </section>
            </div>
        </div>
    )
}
