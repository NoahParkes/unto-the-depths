import './App.css'

import { RoomCard } from './components/RoomCard';
import { roomData } from './data/roomData';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <RoomCard room={roomData} />
    </div>
  );
}

export default App;
