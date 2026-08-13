import { useRoom } from '../../state/RoomContext';
import { getCompositeTitle } from '../../utils/roomLogic';
import { sortFeaturesForDisplay } from '../../config/featureRegistry';
import { FeatureEntry } from './FeatureEntry';
import './styling/RoomReader.css';

export function RoomReader() {
    const { room } = useRoom();

    const orderedFeatures = sortFeaturesForDisplay(room.features);

    return (
        <div className="room-reader">
            <div className="reader-title">{getCompositeTitle(room)}</div>

            <p className="reader-description">{room.description}</p>

            <div className="reader-features">
                {orderedFeatures.map((feature, index) => (
                    <FeatureEntry key={feature.id} feature={feature} index={index} />
                ))}
            </div>
        </div>
    );
}