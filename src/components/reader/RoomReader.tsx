import { useRoom } from '../../state/RoomContext';
import { getCompositeTitle } from '../../utils/roomLogic';
import { sortFeaturesForDisplay, getFeatureDisplayName } from '../../config/featureRegistry';
import './RoomReader.css';

export function RoomReader() {
  const { room } = useRoom();

  const orderedFeatures = sortFeaturesForDisplay(room.features);

  return (
    <div className="room-reader">
      <div className="reader-title">{getCompositeTitle(room)}</div>

      <p className="reader-description">{room.description}</p>

      <div className="reader-features">
        {orderedFeatures.map((feature, index) => (
          <div className="reader-feature-entry" key={feature.id}>
            <span className="reader-feature-marker">{String.fromCharCode(65 + index)}.</span>
            {/* add body content*/}
            <span className="reader-feature-content">{getFeatureDisplayName(feature)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}