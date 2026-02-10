import './App.css'

function App() {
  return (
    <div>
      <h1>
        Unto the Depths
      </h1>
      <RoomEditorWindow />
    </div>
  )
}
function RoomEditorWindow() {
  return(
    <div>
      <RoomCard />
    </div>
  )
}

function RoomCard() {
  return (
    <div>
      <h2>
        1. Slimy Crossroads
      </h2>
      <ol type="A">
        <li>Room Trap: Well of Filth. Hidden 2</li>
        <li>Corpse</li>
        <li>Ladder</li>
      </ol>
    </div>
  )
}

export default App
