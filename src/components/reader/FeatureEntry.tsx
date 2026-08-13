import type { Feature } from '../../types/room';
import { getFeatureDisplayName } from '../../config/featureRegistry';
import { RoomTrapReader } from './RoomTrapReader';
import { EncounterReader } from './EncounterReader';
import './styling/FeatureEntry.css';

interface FeatureEntryProps {
  feature: Feature;
  index: number;
}

export function FeatureEntry({ feature, index }: FeatureEntryProps) {
  return (
    <div className="reader-feature-entry">
      <span className="reader-feature-marker">{String.fromCharCode(65 + index)}.</span>
      <div className="reader-feature-content">
        <span className="reader-feature-display-name">{getFeatureDisplayName(feature)}</span>
        {feature.type === 'encounter' && <EncounterReader feature={feature} />}
        {feature.type === 'roomTrap' && <RoomTrapReader feature={feature} />}
      </div>
    </div>
  );
}