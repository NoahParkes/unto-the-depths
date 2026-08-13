import type { Feature } from '../../types/room';
import { TrapDetailsReader } from './TrapDetailsReader';

type DetailFeature = Extract<Feature, { type: 'detail' }>;

interface DetailReaderProps {
  feature: DetailFeature;
}

export function DetailReader({ feature }: DetailReaderProps) {
  return (
    <div className="detail-reader">
      <p className="detail-reader-description">{feature.description}</p>
      {feature.trapped && <TrapDetailsReader trap={feature} />}
    </div>
  );
}