import type { TrapDetails } from '../../types/room';
import { formatTest } from '../../utils/roomLogic';
import './styling/TrapDetailsReader.css';

interface TrapDetailsReaderProps {
  trap: TrapDetails;
}

export function TrapDetailsReader({ trap }: TrapDetailsReaderProps) {
  return (
    <div className="trap-details-reader">
      {trap.disarm && (
        <p className="trap-line">
          <span className="trap-line-label">Disarm:</span>{' '}
          {trap.disarm.test && `${formatTest(trap.disarm.test)}. `}
          {trap.disarm.description}
        </p>
      )}

      {trap.trigger && (
        <p className="trap-line">
          <span className="trap-line-label">Trigger:</span>{' '}
          {formatTest(trap.trigger.test)}
          {trap.trigger.description && `. ${trap.trigger.description}`}
        </p>
      )}

      {trap.effect && (
        <p className="trap-line">
          <span className="trap-line-label">Effect:</span> {trap.effect.description}
        </p>
      )}
    </div>
  );
}