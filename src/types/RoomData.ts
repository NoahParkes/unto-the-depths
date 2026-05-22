export type FeatureType = 'encounter' | 'trap' | 'feature' | 'sign';
export type FeatureSubType = 'combat' | 'npc' | 'room' | 'detail' | 'feature' | 'trap' | 'sign' | string;

export interface Feature {
  id: string;
  type: FeatureType;
  subtype: FeatureSubType;
  name: string;
  hidden: number; // 0 = visible, higher value means more hidden, Trespasser Rulebook pg.59
  details: string; // Description, later build into description with additional details like loot, checks, etc.
}

export interface RoomData {
  roomId: number;
  name: string;
  isDark: boolean;
  description: string;
  features: Feature[];
}