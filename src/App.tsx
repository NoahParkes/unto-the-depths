import { useState } from 'react';
import './App.css';
import { usePersistedRoom } from './state/usePersistedRoom';
import { RoomProvider } from './state/RoomContext';
import { RoomEditor } from './components/editor/RoomEditor';
import { RoomReader } from './components/reader/RoomReader';
import { exportRoomAsJson } from './services/storage';

function App() {
  const { room, setRoom, saveNow, clearStorage } = usePersistedRoom(1);
  const [mode, setMode] = useState<'editor' | 'reader'>('editor');

  const handleClear = () => {
    if (window.confirm('Clear all saved room data? This cannot be undone.')) {
      clearStorage();
    }
  };

  return (
    <div className="app-container">
      <div className="app-shell">
        <div className="app-toolbar">
          <button onClick={saveNow}>Save</button>
          <button onClick={() => exportRoomAsJson(room)}>Export JSON</button>
          <button className="clear-button" onClick={handleClear}>Clear Storage</button>
          <button onClick={() => setMode(m => (m === 'editor' ? 'reader' : 'editor'))}>
            {mode === 'editor' ? 'Preview' : 'Back to Editor'}
          </button>
        </div>
        <RoomProvider room={room} onChange={setRoom}>
          {mode === 'editor' ? <RoomEditor /> : <RoomReader />}
        </RoomProvider>
      </div>
    </div>
  );
}

export default App;