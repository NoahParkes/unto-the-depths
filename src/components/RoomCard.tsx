import { useEffect, useState } from 'react';
import type { RoomData } from '../types/RoomData';
import { RoomFeature } from './RoomFeature';

interface RoomCardProps {
  room: RoomData;
  onUpdate: (updatedRoom: RoomData) => void; // Callback to update the room in parent state
}

export function RoomCard({ room, onUpdate}: RoomCardProps) {
  // Calculate Title Tags (D, E, T)
  const tags: string[] = [];
  
  if (room.isDark) tags.push('D');
  
  const hasEncounter = room.features.some(f => f.category === 'encounter');
  if (hasEncounter) tags.push('E');
  
  const hasTrap = room.features.some(f => f.category === 'trap');
  if (hasTrap) tags.push('T');

  // State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(room.name);
  const [draftDescription, setDraftDescription] = useState(room.description);

  // Sync draft state with room prop when room changes
  useEffect(() => {
    setDraftName(room.name);
    setDraftDescription(room.description);
  }, [room]);

  // Handlers
  const handleSave = () => {
    // Create updated room object
    const updatedRoom: RoomData = {
      ...room,
      name: draftName,
      description: draftDescription,
    };
    onUpdate(updatedRoom);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset drafts to current room values
    setDraftName(room.name);
    setDraftDescription(room.description);
  };

  // 4. Render Logic
  if (isEditing) {
    return (
      <div className="room-card room-card-editing border-2 border-blue-400 p-4 rounded">
        <h2 className="room-title text-sm mb-2">Editing: {room.roomId}</h2>
        
        <div className="mb-3">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Name</label>
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <div className="mb-3">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            rows={3}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const tagString = tags.length > 0 ? ` (${tags.join(', ')})` : '';
  const compositeTitle = `${room.roomId}. ${room.name}${tagString}`;
  
  return (
    <div className="room-card relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 bg-yellow-500 text-white text-xs rounded shadow hover:bg-yellow-600"
        >
          Edit
        </button>
      </div>

      <h2 className="room-title">
        {compositeTitle}
      </h2>
      
      <p className="room-description">
        {room.description}
      </p>

      <ul className="features-list">
        {room.features.map((feature, index) => (
          <RoomFeature 
            key={feature.id} 
            feature={feature} 
            index={index} 
          />
        ))}
      </ul>
    </div>
  );
}