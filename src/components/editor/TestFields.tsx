import type { Test, AttributeName, Skill } from '../../types/room';
import './TestFields.css';

const ATTRIBUTE_NAMES: AttributeName[] = ['Might', 'Agility', 'Intellect', 'Spirit'];
const SKILLS: Skill[] = [
  'Acrobatics', 'Alchemy', 'Athletics', 'Crafting', 'Folklore', 'Letters',
  'Magic', 'Nature', 'Perception', 'Speech', 'Stealth', 'Tinkering',
];

interface TestFieldsProps {
  test: Test;
  onChange: (test: Test) => void;
}

// Reused wherever a Test appears (Trigger, Disarm, Check)
export function TestFields({ test, onChange }: TestFieldsProps) {
  return (
    <div className="test-fields">
      <select
        value={test.attributeName}
        onChange={e => onChange({ ...test, attributeName: e.target.value as AttributeName })}
      >
        {ATTRIBUTE_NAMES.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <select
        value={test.skill}
        onChange={e => onChange({ ...test, skill: e.target.value as Skill })}
      >
        {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <span className="test-vs-label">vs</span>
      <input
        type="number"
        min={1}
        value={test.difficulty}
        onChange={e => onChange({ ...test, difficulty: Number(e.target.value) })}
      />
    </div>
  );
}