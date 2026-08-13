import type { Feature } from '../../types/room';
import { TrapDetailsReader } from './TrapDetailsReader';
import './styling/RoomTrapReader.css';

type RoomTrapFeature = Extract<Feature, { type: 'roomTrap' }>;

interface RoomTrapReaderProps {
  feature: RoomTrapFeature;
}

export function RoomTrapReader({ feature }: RoomTrapReaderProps) {
  return (
    <div className="room-trap-reader">
      <p className="trap-line">{feature.description}</p>
      <TrapDetailsReader trap={feature} />
    </div>
  );
}