import type { Feature } from '../../types/room';
import { useRoom } from '../../state/RoomContext';
import { getFeatureDisplayName } from '../../config/featureRegistry';
import { EncounterEditor } from './EncounterEditor';
import { RoomTrapEditor } from './RoomTrapEditor';
import { DetailEditor } from './DetailEditor';
import { SubDetailList } from './SubDetailList';
import './FeatureTile.css';

interface FeatureTileProps {
  feature: Feature;
  index: number;
}

export function FeatureTile({ feature, index }: FeatureTileProps) {
  const { updateFeature, removeFeature, addSubDetail, updateSubDetail, removeSubDetail } = useRoom();

  return (
    <div className="editor-feature-tile">
      <div className="feature-tile-header">
        <span className="feature-index">{String.fromCharCode(65 + index)}.</span>
        <input
          type="text"
          className="feature-name-field"
          placeholder="Name"
          value={feature.detailName}
          onChange={e => updateFeature({ ...feature, detailName: e.target.value })}
        />
        <button className="feature-delete" onClick={() => removeFeature(feature.id)}>Delete</button>
      </div>

      <div className="feature-display-name-preview">{getFeatureDisplayName(feature)}</div>

      <div className="feature-tile-body">
        {feature.type === 'encounter' && <EncounterEditor feature={feature} onChange={updateFeature} />}
        {feature.type === 'roomTrap' && <RoomTrapEditor feature={feature} onChange={updateFeature} />}
        {feature.type === 'detail' && <DetailEditor feature={feature} onChange={updateFeature} />}
      </div>

      <SubDetailList
        subDetails={feature.subDetails}
        onAdd={sd => addSubDetail(feature.id, sd)}
        onUpdate={sd => updateSubDetail(feature.id, sd)}
        onRemove={sdId => removeSubDetail(feature.id, sdId)}
      />
    </div>
  );
}