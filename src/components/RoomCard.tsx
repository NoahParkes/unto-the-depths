import type { RoomData } from '../types/RoomData';
import { RoomFeature } from './RoomFeature';

interface RoomCardProps {
  room: RoomData;
}

export function RoomCard({ room }: RoomCardProps) {
  // 1. Calculate Title Tags (D, E, T)
  const tags: string[] = [];
  
  if (room.isDark) tags.push('D');
  
  const hasEncounter = room.features.some(f => f.type === 'encounter');
  if (hasEncounter) tags.push('E');
  
  const hasTrap = room.features.some(f => f.type === 'trap');
  if (hasTrap) tags.push('T');

  const tagString = tags.length > 0 ? ` (${tags.join(', ')})` : '';
  const compositeTitle = `${room.roomId}. ${room.name}${tagString}`;
  
  return (
    <div className="room-card">
      <h2 className="room-title">
        {compositeTitle}
      </h2>
      
      <p className="room-description">
        {room.description}
      </p>

      <ul className="list-features">
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