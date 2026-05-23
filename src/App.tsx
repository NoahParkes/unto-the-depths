import './App.css'

import { RoomCard } from './components/RoomCard';
import { generateRandomRoom } from './utils/roomGenerator';

import { useRef, useState} from 'react';

function App() {
  const [room, setRoom] = useState(() => generateRandomRoom(1));

  const nextIdRef = useRef<number>(2);

  // Button to regenerate without reloading
  const regenerate = () => {
    const newRoom = (generateRandomRoom(nextIdRef.current));

    setRoom(newRoom);

    nextIdRef.current += 1;
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
