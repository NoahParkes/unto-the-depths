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
      <div className="room-card">
        <h2 className="room-title"> 
          {room.roomId}. 
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            className="room-title"
          />
        </h2>
        
        <div>
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            className="room-description"
          />
        </div>

        <ul className="features-list">
          {room.features.map((feature, index) => (
            <RoomFeature 
              key={feature.id} 
              feature={feature} 
              index={index} 
            />
          ))}
        </ul>

        <div className="save-cancel-buttons">
          <button 
            onClick={handleSave}
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
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
    <div className="room-card">
      <div className="edit-button">
        <button 
          onClick={() => setIsEditing(true)}
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