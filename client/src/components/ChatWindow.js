import React, {  useEffect } from "react";
import Chat from "./Chat";

export default function ChatWindow({

    show,
    sender,
    receiver,
    name,
    photo,
    callback1,

  }) 
  
  {
  const showHideClassName = show ? "fixed z-50 block right-0 bottom-0" : " fixed z-50 fixed hidden right-0 bottom-0";

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
