import './App.css'

import { RoomCard } from './components/RoomCard';
import { generateRandomRoom } from './utils/roomGenerator';

import { useRef, useState} from 'react';

function App() {
  const [room, setRoom] = useState(() => generateRandomRoom(1));
  const nextIdRef = useRef<number>(2);

  // Button to regenerate without reloading
  const handleRegenerate = () => {
    const newRoom = (generateRandomRoom(nextIdRef.current));
    setRoom(newRoom);
    nextIdRef.current += 1;
  };

  // Export Logic
  const handleExport = () => {
    const jsonContent = JSON.stringify(room, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `room-${room.roomId}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button onClick={handleRegenerate}>Generate New Room</button>
        <button onClick={handleExport}>Export Room</button>
      </div>
      <RoomCard room={room} />
    </div>
  );
}

export default App;
