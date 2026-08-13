import type { Room } from '../types/room';

const STORAGE_PREFIX = 'unto-the-depths:room:';

function storageKey(roomId: number): string {
  return `${STORAGE_PREFIX}${roomId}`;
}

export function saveRoom(room: Room): void {
  try {
    localStorage.setItem(storageKey(room.roomId), JSON.stringify(room));
  } catch (err) {
    // throw error to console rather than crashing the app
    console.error('Failed to save room', err);
  }
}

export function loadRoom(roomId: number): Room | null {
  try {
    const raw = localStorage.getItem(storageKey(roomId));
    if (!raw) return null;
    return JSON.parse(raw) as Room;
  } catch (err) {
    console.error('Failed to load room', err);
    return null;
  }
}

export function deleteStoredRoom(roomId: number): void {
  localStorage.removeItem(storageKey(roomId));
}

// Formats the current date/time for use in an export filename
function formatTimestampForFilename(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const datePart = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timePart = `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
  return `${datePart}_${timePart}`;
}

// Triggers a browser download of the room as a formatted .json file.
// Filename is the room title plus an export timestamp, so repeated exports
// of the same room don't silently overwrite one another.
export function exportRoomAsJson(room: Room): void {
  const blob = new Blob([JSON.stringify(room, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const timestamp = formatTimestampForFilename(new Date());
  const titlePart = room.title.trim() || 'room';

  const link = document.createElement('a');
  link.href = url;
  link.download = `${titlePart}_${timestamp}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}