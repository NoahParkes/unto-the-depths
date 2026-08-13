import type { Feature } from '../../types/room';
import { formatTest } from '../../utils/roomLogic';
import './styling/SubDetailEntry.css';

type SubDetail = Feature['subDetails'][number]; // Note | Check

interface SubDetailEntryProps {
  subDetail: SubDetail;
}

export function SubDetailEntry({ subDetail }: SubDetailEntryProps) {
  if (subDetail.type === 'note') {
    return (
      <p className="sub-detail-entry">
        {subDetail.name && <span className="sub-detail-name">{subDetail.name}: </span>}
        {subDetail.description}
      </p>
    );
  }

  // check
  return (
    <p className="sub-detail-entry">
      <span className="sub-detail-name">Check:</span> {formatTest(subDetail.test)}
      {subDetail.description && ` — ${subDetail.description}`}
    </p>
  );
}