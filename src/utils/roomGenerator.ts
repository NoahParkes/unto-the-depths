import roomNames from '../data/pools/roomNames.json';
import roomDescriptions from '../data/pools/roomDescriptions.json';
import roomFeaturesPool from '../data/pools/roomFeatures.json';

import type { RoomData, Feature } from '../types/RoomData';

// Helper: Pick a random item from an array
const randomPick = <T>(arr: T[]): T => {
  if (arr.length === 0) throw new Error("Cannot pick from empty array");
  return arr[Math.floor(Math.random() * arr.length)];
};

export function generateRandomRoom(roomId: number): RoomData {
  // Pick name and description
  const name = randomPick(roomNames);
  const description = randomPick(roomDescriptions);

  const isDark = Math.random() > 0.5;

  // Select random features from the pool
  // ------------------------------------
  
  const poolSize = roomFeaturesPool.length;
  const countToSelect = Math.min(5, poolSize); // Max 5 features, but not more than the pool size

  // Create a copy of indices to pick from
  const availableIndices = Array.from({ length: poolSize }, (_, i) => i);
  const selectedFeatures: Feature[] = [];

  // Loop to select features without duplicates
  // Feature indexes are removed from availableIndices when used
  for (let i = 0; i < countToSelect; i++) {

    const randomIndex = Math.floor(Math.random() * availableIndices.length);

    const poolIndex = availableIndices[randomIndex];

    selectedFeatures.push(roomFeaturesPool[poolIndex] as Feature);
    
    availableIndices.splice(randomIndex, 1);
  }

  // Sort the features based on:
  // Priority: Encounter (0) -> Trap (1) -> Feature (2) -> Sign (3)
  const sortedFeatures = [...selectedFeatures].sort((a, b) => {
    const getPriority = (type: string) => {
      if (type === 'encounter') return 0;
      if (type === 'trap') return 1;
      if (type === 'feature') return 2;
      if (type === 'sign') return 3;
      return 4;
    };

    const aPriority = getPriority(a.type);
    const bPriority = getPriority(b.type);

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // Secondary sort by hidden (least hidden first)
    return a.hidden - b.hidden;
  });

  // Return the object
  return {
    roomId,
    name,
    isDark,
    description,
    features: sortedFeatures
  };
}
