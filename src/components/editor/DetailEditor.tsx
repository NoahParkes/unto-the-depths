import type { Feature } from '../../types/room';
import { TrapDetailsFields } from './TrapDetailsFields';
import './styling/DetailEditor.css';

type DetailFeature = Extract<Feature, { type: 'detail' }>;

interface DetailEditorProps {
  feature: DetailFeature;
  onChange: (feature: DetailFeature) => void;
}

export function DetailEditor({ feature, onChange }: DetailEditorProps) {
  return (
    <div className="detail-editor">
      <textarea
        className="trap-description-field"
        placeholder="Description"
        value={feature.description}
        onChange={e => onChange({ ...feature, description: e.target.value })}
      />

      <label className="detail-trapped-toggle">
        <input
          type="checkbox"
          checked={feature.trapped}
          onChange={e => onChange({ ...feature, trapped: e.target.checked })}
        />
        Trapped
      </label>

      {feature.trapped && (
        <TrapDetailsFields trap={feature} onChange={trap => onChange({ ...feature, ...trap })} />
      )}
    </div>
  );
}