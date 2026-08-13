import type { Feature } from '../../types/room';

type EncounterFeature = Extract<Feature, { type: 'encounter' }>;

interface EncounterReaderProps {
  feature: EncounterFeature;
}

export function EncounterReader({ feature }: EncounterReaderProps) {
  return <p className="encounter-reader-description">{feature.description}</p>;
}