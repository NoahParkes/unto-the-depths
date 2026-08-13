import type { Feature } from '../../types/room';
import { SubDetailEntry } from './SubDetailEntry';
import './styling/SubDetailList.css';

type SubDetail = Feature['subDetails'][number];

interface SubDetailListProps {
  subDetails: SubDetail[];
}

export function SubDetailList({ subDetails }: SubDetailListProps) {
  if (subDetails.length === 0) return null;

  return (
    <div className="reader-sub-detail-list">
      {subDetails.map(sd => (
        <SubDetailEntry key={sd.id} subDetail={sd} />
      ))}
    </div>
  );
}