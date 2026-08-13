import { useState } from 'react';
import type { Feature } from '../../types/room';
import { useRoom } from '../../state/RoomContext';
import { getAddableFeatureTypes } from '../../config/featureRegistry';
import { getCompositeTitle } from '../../utils/roomLogic';
import { FeatureTile } from './FeatureTile';
import './styling/RoomEditor.css';

export function RoomEditor() {
  const { room, updateTitle, updateDescription, toggleDark, addFeature } = useRoom();
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addableTypes = getAddableFeatureTypes(room.features);

  const handleAddFeature = (type: Feature['type']) => {
    addFeature(type);
    setShowAddMenu(false);
  };

  return (
    <div className="room-editor">
      <div className="editor-header">
        <input
          className="editor-title"
          type="text"
          value={room.title}
          onChange={e => updateTitle(e.target.value)}
          placeholder="Room title"
        />
        <label className="editor-dark-toggle">
          <input type="checkbox" checked={room.isDark} onChange={toggleDark} />
          Dark
        </label>
      </div>

      <div className="editor-composite-preview">{getCompositeTitle(room)}</div>

      <textarea
        className="editor-description"
        value={room.description}
        onChange={e => updateDescription(e.target.value)}
        placeholder="Room description"
      />

      <div className="editor-features">
        {room.features.map((feature, index) => (
          <FeatureTile key={feature.id} feature={feature} index={index} />
        ))}

        <div className="editor-add-feature">
          <button onClick={() => setShowAddMenu(s => !s)}>+</button>
          {showAddMenu && (
            <ul className="add-feature-menu">
              {addableTypes.map(({ type, label, disabled }) => (
                <li key={type}>
                  <button disabled={disabled} onClick={() => handleAddFeature(type)}>{label}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}