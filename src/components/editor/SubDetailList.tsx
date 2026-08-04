import { useState } from 'react';
import type { Feature } from '../../types/room';
import { getAddableSubDetailTypes, createBlankSubDetail } from '../../config/subDetailRegistry';
import { NoteEditor } from './NoteEditor';
import { CheckEditor } from './CheckEditor';
import './styling/SubDetailList.css';

type SubDetail = Feature['subDetails'][number];

interface SubDetailListProps {
  subDetails: SubDetail[];
  onAdd: (subDetail: SubDetail) => void;
  onUpdate: (subDetail: SubDetail) => void;
  onRemove: (subDetailId: string) => void;
}

export function SubDetailList({ subDetails, onAdd, onUpdate, onRemove }: SubDetailListProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const addableTypes = getAddableSubDetailTypes();

  const handleAdd = (type: SubDetail['type']) => {
    onAdd(createBlankSubDetail(type, crypto.randomUUID()));
    setShowAddMenu(false);
  };

  return (
    <div className="sub-detail-list">
      {subDetails.map(sd => (
        <div className="sub-detail-tile" key={sd.id}>
          {sd.type === 'note' && <NoteEditor subDetail={sd} onChange={onUpdate} />}
          {sd.type === 'check' && <CheckEditor subDetail={sd} onChange={onUpdate} />}
          <button className="sub-detail-delete" onClick={() => onRemove(sd.id)}>Delete</button>
        </div>
      ))}

      <div className="sub-detail-add">
        <button onClick={() => setShowAddMenu(s => !s)}>+ Sub-detail</button>
        {showAddMenu && (
          <ul className="sub-detail-add-menu">
            {addableTypes.map(({ type, label }) => (
              <li key={type}><button onClick={() => handleAdd(type)}>{label}</button></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}