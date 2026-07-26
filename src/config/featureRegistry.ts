import type { Feature } from '../types/room';

interface FeatureTypeConfig<T extends Feature> {
  label: string;               // shown in the "add feature" dropdown
  order: number;                // drives Encounter -> Room Trap -> Detail ordering
  singleton: boolean;           // true for encounter & roomTrap
  tagContribution: 'E' | 'T' | null;
  createBlank: (id: string) => T;
  getDisplayName: (feature: T) => string;
  isComplete: (feature: T) => boolean;
}

type EncounterFeature = Extract<Feature, { type: 'encounter' }>;
type RoomTrapFeature = Extract<Feature, { type: 'roomTrap' }>;
type DetailFeature = Extract<Feature, { type: 'detail' }>;

type FeatureRegistry = {
  [K in Feature['type']]: FeatureTypeConfig<Extract<Feature, { type: K }>>;
};

export const featureRegistry: FeatureRegistry = {
  encounter: {
    label: 'Encounter',
    order: 0,
    singleton: true,
    tagContribution: 'E',
    createBlank: (id): EncounterFeature => ({
      id,
      type: 'encounter',
      detailName: '',
      tokens: [],
      description: '',
      subDetails: [],
    }),
    getDisplayName: (f) => {
      if (f.tokens.length === 0) return 'Encounter: (untitled).';
      const parts = f.tokens.map(t => (t.count === 1 ? t.name : `${t.count} ${t.name}`));
      return `Encounter: ${parts.join(', ')}.`;
    },
    isComplete: (f) =>
      f.tokens.length > 0 &&
      f.tokens.every(t => t.name.trim() !== '') &&
      f.description.trim() !== '',
  },

  roomTrap: {
    label: 'Room Trap',
    order: 1,
    singleton: true,
    tagContribution: 'T',
    createBlank: (id): RoomTrapFeature => ({
      id,
      type: 'roomTrap',
      detailName: '',
      hidden: 1,
      description: '',
      subDetails: [],
    }),
    getDisplayName: (f) => `Room Trap: ${f.detailName}.`,
    isComplete: (f) =>
      f.detailName.trim() !== '' &&
      f.hidden >= 1 && f.hidden <= 5 &&
      f.description.trim() !== '' &&
      f.trigger !== undefined &&
      f.effect !== undefined && f.effect.description.trim() !== '',
  },

  detail: {
    label: 'Detail',
    order: 2,
    singleton: false,
    tagContribution: null, // stays null even when trapped
    createBlank: (id): DetailFeature => ({
      id,
      type: 'detail',
      detailName: '',
      description: '',
      trapped: false,
      subDetails: [],
    }),
    getDisplayName: (f) =>
      f.trapped ? `Detail Trap: ${f.detailName}.` : `${f.detailName}.`,
    isComplete: (f) => f.description.trim() !== '',
  },
};

// --- Consumer-facing helpers ---

export function createBlankFeature(type: Feature['type'], id: string): Feature {
  return featureRegistry[type].createBlank(id);
}

// Switch (not a keyed lookup) so TS narrows `feature` per-branch and flags
// missing cases if a new feature type is ever added to the union.
export function getFeatureDisplayName(feature: Feature): string {
  switch (feature.type) {
    case 'encounter':
      return featureRegistry.encounter.getDisplayName(feature);
    case 'roomTrap':
      return featureRegistry.roomTrap.getDisplayName(feature);
    case 'detail':
      return featureRegistry.detail.getDisplayName(feature);
  }
}

export function isFeatureComplete(feature: Feature): boolean {
  switch (feature.type) {
    case 'encounter':
      return featureRegistry.encounter.isComplete(feature);
    case 'roomTrap':
      return featureRegistry.roomTrap.isComplete(feature);
    case 'detail':
      return featureRegistry.detail.isComplete(feature);
  }
}

export function getAddableFeatureTypes(existingFeatures: Feature[]) {
  return (Object.keys(featureRegistry) as Feature['type'][]).map(type => {
    const config = featureRegistry[type];
    const alreadyPresent = config.singleton && existingFeatures.some(f => f.type === type);
    return { type, label: config.label, disabled: alreadyPresent };
  });
}

export function sortFeaturesForDisplay(features: Feature[]): Feature[] {
  return [...features].sort((a, b) => featureRegistry[a.type].order - featureRegistry[b.type].order);
}