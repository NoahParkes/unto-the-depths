import type { Feature } from '../../types/room';
import { TrapDetailsFields } from './TrapDetailsFields';
import './styling/RoomTrapEditor.css';

type RoomTrapFeature = Extract<Feature, { type: 'roomTrap' }>;

interface RoomTrapEditorProps {
  feature: RoomTrapFeature;
  onChange: (feature: RoomTrapFeature) => void;
}

export function RoomTrapEditor({ feature, onChange }: RoomTrapEditorProps) {
  return (
    <div className="room-trap-editor">
      <label className="trap-hidden-field">
        Hidden
        <input
          type="number"
          min={1}
          max={5}
          value={feature.hidden}
          onChange={e => onChange({ ...feature, hidden: Number(e.target.value) })}
        />
      </label>

      <textarea
        className="trap-description-field"
        placeholder="Description"
        value={feature.description}
        onChange={e => onChange({ ...feature, description: e.target.value })}
      />

      <TrapDetailsFields trap={feature} onChange={trap => onChange({ ...feature, ...trap })} />
    </div>
  );
}