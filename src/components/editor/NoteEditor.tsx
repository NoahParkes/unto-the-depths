import type { Feature } from '../../types/room';

type SubDetail = Feature['subDetails'][number];
type Note = Extract<SubDetail, { type: 'note' }>;

interface NoteEditorProps {
  subDetail: Note;
  onChange: (subDetail: SubDetail) => void;
}

export function NoteEditor({ subDetail, onChange }: NoteEditorProps) {
  return (
    <div className="note-editor">
      <input
        type="text"
        className="note-name-field"
        placeholder="Name (optional)"
        value={subDetail.name ?? ''}
        onChange={e => onChange({ ...subDetail, name: e.target.value })}
      />
      <textarea
        className="note-description-field"
        placeholder="Description"
        value={subDetail.description}
        onChange={e => onChange({ ...subDetail, description: e.target.value })}
      />
    </div>
  );
}