import './App.css'

import { RoomCard } from './components/RoomCard';
import { generateRandomRoom } from './utils/roomGenerator';

import { useState} from 'react';

function App() {
  const [room, setRoom] = useState(() => generateRandomRoom(1));

  // Button to regenerate without reloading
  const regenerate = () => {
    setRoom(generateRandomRoom(Math.floor(Math.random() * 39) + 2));
  };

  return (
    <div className="app-container">
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button onClick={regenerate}>Generate New Room</button>
      </div>
      <RoomCard room={room} />
    </div>
  );
}

export default App;
