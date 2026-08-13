import { useEffect, useRef, useState, useCallback } from 'react';
import type { Room } from '../types/room';
import { loadRoom, saveRoom, deleteStoredRoom } from '../services/storage';

const AUTOSAVE_DELAY_MS = 500;

function createBlankRoom(roomId: number): Room {
  return {
    roomId,
    title: '',
    description: '',
    isDark: false,
    features: [],
  };
}

// Owns the Room state for a given roomId
export function usePersistedRoom(roomId: number) {
  const [room, setRoom] = useState<Room>(() => loadRoom(roomId) ?? createBlankRoom(roomId));
  const isFirstRender = useRef(true);

  useEffect(() => {
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => saveRoom(room), AUTOSAVE_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [room]);

  const saveNow = useCallback(() => {
    saveRoom(room);
  }, [room]);

  const clearStorage = useCallback(() => {
    deleteStoredRoom(roomId);
    setRoom(createBlankRoom(roomId));
  }, [roomId]);

  return { room, setRoom, saveNow, clearStorage };
}