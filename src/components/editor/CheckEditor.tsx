import type { Feature } from '../../types/room';
import { TestFields } from './TestFields';

type SubDetail = Feature['subDetails'][number];
type Check = Extract<SubDetail, { type: 'check' }>;

interface CheckEditorProps {
  subDetail: Check;
  onChange: (subDetail: SubDetail) => void;
}

export function CheckEditor({ subDetail, onChange }: CheckEditorProps) {
  return (
    <div className="check-editor">
      <TestFields test={subDetail.test} onChange={test => onChange({ ...subDetail, test })} />
      <textarea
        className="note-description-field"
        placeholder="Description (optional)"
        value={subDetail.description ?? ''}
        onChange={e => onChange({ ...subDetail, description: e.target.value })}
      />
    </div>
  );
}