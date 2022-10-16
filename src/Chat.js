import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket, room, name}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes() + 
                ":" + 
                new Date(Date.now()).getSeconds()
            };

            await socket.emit("send_message", messageData);
            setMessageList(list=>[...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(()=>{
        socket.on("receive_message", (data)=>{
            setMessageList(list=>[...list, data]);
        });
    }, [socket]);

    const messages = Array.from(
        new Set(
            messageList.map(item=>{
            return item;
          })
        ));

  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Live chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container ">
                {
                    messages.map(msg=>{
                        return <div key={msg.time}>       
                        <div className="message" id={name === msg.author ? "you" : "other"} >
                            <div>
                                <div className="message-content">
                                    <p>{msg.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{msg.time}</p>
                                    <p id="author">{msg.author}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    })
                }
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input 
                type="text" 
                placeholder="type..." 
                value={currentMessage}
                onChange={e=>setCurrentMessage(e.target.value)}
                onKeyPress={e=> {
                    e.key === "Enter" && sendMessage();
                }}
                />
            <button onClick={sendMessage} >&#9658;</button>
        </div>
    </div>
  )
}

export default Chat