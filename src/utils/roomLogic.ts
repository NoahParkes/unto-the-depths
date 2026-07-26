// utils/roomLogic.ts
import type { Room } from '../types/room';
import { featureRegistry } from '../config/featureRegistry';

// Fixed display order for room tags, independent of feature insertion order
const TAG_ORDER = ['D', 'E', 'T'] as const;

// Derives which tags apply to a room: D from isDark, E/T from any feature
// whose registry entry contributes one (encounter -> E, roomTrap -> T).
// Detail traps contribute null, so they never add T - matches the rule
// that only a dedicated Room Trap feature adds the T tag.
export function getRoomTags(room: Room): string[] {
  const tags = new Set<string>();
  if (room.isDark) tags.add('D');

  for (const feature of room.features) {
    const contribution = featureRegistry[feature.type].tagContribution;
    if (contribution) tags.add(contribution);
  }

  return TAG_ORDER.filter(tag => tags.has(tag));
}

// Room title with its derived tags appended, e.g. "Opulent Antechamber (D,E)"
export function getCompositeTitle(room: Room): string {
  const tags = getRoomTags(room);
  if (tags.length === 0) return room.title;
  return `${room.title} (${tags.join(',')})`;
}