import './App.css'

import { RoomCard } from './components/RoomCard';
import { generateRandomRoom } from './utils/roomGenerator';

import { useState} from 'react';

function App() {
  const [room, setRoom] = useState(() => generateRandomRoom(1));

  return (
    <div className="app-container">
      <RoomCard room={room} />
    </div>
  );
}

export default App;
