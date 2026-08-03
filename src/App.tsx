import './App.css';
import { usePersistedRoom } from './state/usePersistedRoom';
import { RoomProvider } from './state/RoomContext';
import { RoomEditor } from './components/editor/RoomEditor';
import { exportRoomAsJson } from './services/storage';

function App() {
  const { room, setRoom, saveNow, clearStorage } = usePersistedRoom(1);

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
        </div>
        <RoomProvider room={room} onChange={setRoom}>
          <RoomEditor />
        </RoomProvider>
      </div>
    </div>
  );
}

export default App;