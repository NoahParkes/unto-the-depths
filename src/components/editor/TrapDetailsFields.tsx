import type { TrapDetails, Test } from '../../types/room';
import { TestFields } from './TestFields';
import './styling/TrapDetailsFields.css';

interface TrapDetailsFieldsProps {
  trap: TrapDetails;
  onChange: (trap: TrapDetails) => void;
}

const defaultTest = (): Test => ({ attributeName: 'Might', skill: 'Athletics', difficulty: 10 });

export function TrapDetailsFields({ trap, onChange }: TrapDetailsFieldsProps) {
  return (
    <div className="trap-details-fields">
      <div className="trap-field-group">
        <label className="trap-field-label">
          <input
            type="checkbox"
            checked={trap.disarm !== undefined}
            onChange={e =>
              onChange({ ...trap, disarm: e.target.checked ? { type: 'disarm', description: '' } : undefined })
            }
          />
          Disarm
        </label>
        {trap.disarm && (
          <div className="trap-field-body">
            <label className="trap-field-label">
              <input
                type="checkbox"
                checked={trap.disarm.test !== undefined}
                onChange={e =>
                  onChange({
                    ...trap,
                    disarm: { ...trap.disarm!, test: e.target.checked ? defaultTest() : undefined },
                  })
                }
              />
              Add test
            </label>
            {trap.disarm.test && (
              <TestFields
                test={trap.disarm.test}
                onChange={test => onChange({ ...trap, disarm: { ...trap.disarm!, test } })}
              />
            )}
            <textarea
              className="trap-description-field"
              placeholder="Disarm description"
              value={trap.disarm.description ?? ''}
              onChange={e => onChange({ ...trap, disarm: { ...trap.disarm!, description: e.target.value } })}
            />
          </div>
        )}
      </div>

      <div className="trap-field-group">
        <span className="trap-field-label">Trigger (required)</span>
        <div className="trap-field-body">
          <TestFields
            test={trap.trigger?.test ?? defaultTest()}
            onChange={test => onChange({ ...trap, trigger: { type: 'trigger', test, description: trap.trigger?.description } })}
          />
          <textarea
            className="trap-description-field"
            placeholder="Trigger description (optional)"
            value={trap.trigger?.description ?? ''}
            onChange={e =>
              onChange({
                ...trap,
                trigger: { type: 'trigger', test: trap.trigger?.test ?? defaultTest(), description: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="trap-field-group">
        <span className="trap-field-label">Effect</span>
        <textarea
          className="trap-description-field"
          placeholder="Effect description"
          value={trap.effect?.description ?? ''}
          onChange={e => onChange({ ...trap, effect: { type: 'effect', description: e.target.value } })}
        />
      </div>
    </div>
  );
}