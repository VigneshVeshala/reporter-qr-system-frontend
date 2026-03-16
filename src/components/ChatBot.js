import React, { useState } from "react";

export default function ChatBot() {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if(message.trim()==="") return;

    const res = await fetch("http://localhost:8080/api/chat",{
      method:"POST",
      headers:{
        "Content-Type":"text/plain"
      },
      body:message
    });

    const data = await res.text();

    setChat([...chat,{user:message,bot:data}]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={()=>setOpen(!open)}
        style={{
          position:"fixed",
          bottom:"20px",
          right:"20px",
          borderRadius:"50%",
          width:"60px",
          height:"60px",
          background:"#007bff",
          color:"white",
          fontSize:"20px",
          border:"none"
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position:"fixed",
          bottom:"90px",
          right:"20px",
          width:"300px",
          height:"400px",
          background:"white",
          border:"1px solid #ccc",
          borderRadius:"10px",
          padding:"10px"
        }}>

          <h4>AI Assistant 🤖</h4>

          <div style={{height:"250px",overflowY:"auto"}}>

            {chat.map((c,i)=>(
              <div key={i}>
                <p><b>You:</b> {c.user}</p>
                <p><b>Bot:</b> {c.bot}</p>
              </div>
            ))}

          </div>

          <input
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Ask something..."
            style={{width:"70%"}}
          />

          <button onClick={sendMessage}>Send</button>

        </div>
      )}
    </>
  );
}