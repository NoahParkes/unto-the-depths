import type { Feature } from '../../types/room';
import './EncounterEditor.css';

type EncounterFeature = Extract<Feature, { type: 'encounter' }>;

interface EncounterEditorProps {
  feature: EncounterFeature;
  onChange: (feature: EncounterFeature) => void;
}

export function EncounterEditor({ feature, onChange }: EncounterEditorProps) {
  const updateToken = (index: number, patch: Partial<{ count: number; name: string }>) => {
    onChange({ ...feature, tokens: feature.tokens.map((t, i) => (i === index ? { ...t, ...patch } : t)) });
  };

  const removeToken = (index: number) => {
    onChange({ ...feature, tokens: feature.tokens.filter((_, i) => i !== index) });
  };

  const addToken = () => {
    onChange({ ...feature, tokens: [...feature.tokens, { count: 1, name: '' }] });
  };

  return (
    <div className="encounter-editor">
      <div className="encounter-tokens">
        {feature.tokens.map((token, index) => (
          <div className="encounter-token-row" key={index}>
            <input
              type="number"
              className="token-count-field"
              min={1}
              value={token.count}
              onChange={e => updateToken(index, { count: Number(e.target.value) })}
            />
            <input
              type="text"
              className="token-name-field"
              placeholder="Creature/NPC Name"
              value={token.name}
              onChange={e => updateToken(index, { name: e.target.value })}
            />
            <button className="token-delete" onClick={() => removeToken(index)}>Delete</button>
          </div>
        ))}
        <button className="token-add" onClick={addToken}>+ Encounter</button>
      </div>

      <textarea
        className="trap-description-field"
        placeholder="Description"
        value={feature.description}
        onChange={e => onChange({ ...feature, description: e.target.value })}
      />
    </div>
  );
}