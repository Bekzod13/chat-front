import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './Chat';

const socket = io.connect("https://deft-vacherin-79b41a.netlify.app/");

function App() {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if(name !== "" && room !== ""){
      socket.emit("join_room", room);
      setShow(true);
    }
  }

  return (
    <div className="App">
      {
        !show ? 
      <div className="joinChatContainer">
        <h3>Join a chat</h3>
        <input type="text" placeholder="Bek" onChange={e=>setName(e.target.value)} />
        <input type="text" placeholder="room id" onChange={e=>setRoom(e.target.value)} />
        <button onClick={joinRoom}>join room</button>
      </div>:
        <Chat socket={socket} room={room} name={name} />
      }
    </div>
  );
}

export default App;
