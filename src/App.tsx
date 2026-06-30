import './App.css'

import { RoomCard } from './components/RoomCard';
import { generateRandomRoom } from './utils/roomGenerator';
import { useRef, useState, type ChangeEvent} from 'react';
import type { RoomData } from './types/RoomData';

function App() {
  const [room, setRoom] = useState(() => generateRandomRoom(1));
  const nextIdRef = useRef<number>(2);
  
  // Handler to update the room when editing is saved
  const handleRoomUpdate = (updatedRoom: RoomData) => {
    setRoom(updatedRoom);
  };

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

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    // Ensure a file was selected
    const file = event.target.files?.[0];
    if (!file) return;

    // Read the file content
    const reader = new FileReader();

    // When the file is loaded, parse it and update the room state
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const importedRoom = JSON.parse(text) as RoomData;

        setRoom(importedRoom);

        nextIdRef.current = Math.max(nextIdRef.current, importedRoom.roomId + 1);

      } catch (error) {
        alert('Failed to import room');
      }
    };

    // Read the file as text
    reader.readAsText(file);
  };

  return (
    <div className="app-container">
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button onClick={handleRegenerate}>Generate New Room</button>
        <button onClick={handleExport}>Export Room</button>

        <input
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
          id="import-file"
        />

        <button onClick={() => document.getElementById('import-file')?.click()}>
          Import Room
        </button>
      </div>

      <RoomCard 
        room={room} 
        onUpdate={handleRoomUpdate} 
      />
    </div>
  );
}

export default App;
