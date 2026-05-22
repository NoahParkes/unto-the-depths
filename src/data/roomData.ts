import rawRoomData from './roomData.json';
import type { RoomData } from '../types/RoomData';

// Asserts imported JSON as matching RoomData interface
export const roomData: RoomData = rawRoomData as RoomData;
