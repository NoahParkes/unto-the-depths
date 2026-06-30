export type FeatureCategory = 'encounter' | 'trap' | 'feature' | 'sign';
export type FeatureSubCategory = 'combat' | 'npc' | 'room' | 'detail' | 'feature' | 'sign' | string;

export interface Feature {
  id: string;
  category: FeatureCategory;
  subcategory: FeatureSubCategory;
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