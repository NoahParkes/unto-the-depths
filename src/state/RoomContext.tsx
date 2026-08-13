import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { Feature, Room } from '../types/room';
import { createBlankFeature, featureRegistry } from '../config/featureRegistry';

type SubDetail = Feature['subDetails'][number]; // Note | Check

interface RoomContextValue {
  room: Room;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  toggleDark: () => void;
  addFeature: (type: Feature['type']) => void;
  updateFeature: (updated: Feature) => void;
  removeFeature: (id: string) => void;
  addSubDetail: (featureId: string, subDetail: SubDetail) => void;
  updateSubDetail: (featureId: string, updated: SubDetail) => void;
  removeSubDetail: (featureId: string, subDetailId: string) => void;
}

const RoomContext = createContext<RoomContextValue | undefined>(undefined);

interface RoomProviderProps {
  room: Room;
  onChange: (room: Room) => void;
  children: ReactNode;
}

// RoomProvider is deliberately controlled (room + onChange passed in) rather
// than owning state itself, so the persistence layer (usePersistedRoom, next
// step) can sit above it and own the actual storage/state without this file
// needing to know anything about localStorage.
export function RoomProvider({ room, onChange, children }: RoomProviderProps) {
  const updateTitle = useCallback((title: string) => {
    onChange({ ...room, title });
  }, [room, onChange]);

  const updateDescription = useCallback((description: string) => {
    onChange({ ...room, description });
  }, [room, onChange]);

  const toggleDark = useCallback(() => {
    onChange({ ...room, isDark: !room.isDark });
  }, [room, onChange]);

  const addFeature = useCallback((type: Feature['type']) => {
    const config = featureRegistry[type];
    const alreadyPresent = config.singleton && room.features.some(f => f.type === type);
    if (alreadyPresent) return; // defensive guard - UI dropdown should already prevent this

    const feature = createBlankFeature(type, crypto.randomUUID());
    onChange({ ...room, features: [...room.features, feature] });
  }, [room, onChange]);

  // Caller supplies the whole updated feature object (e.g. an editor tile
  // holding its own draft state and committing on change), rather than a
  // partial patch - keeps this type-safe across the discriminated union
  // without needing per-type patch handling here.
  const updateFeature = useCallback((updated: Feature) => {
    onChange({
      ...room,
      features: room.features.map(f => (f.id === updated.id ? updated : f)),
    });
  }, [room, onChange]);

  const removeFeature = useCallback((id: string) => {
    onChange({ ...room, features: room.features.filter(f => f.id !== id) });
  }, [room, onChange]);

  const addSubDetail = useCallback((featureId: string, subDetail: SubDetail) => {
    onChange({
      ...room,
      features: room.features.map(f =>
        f.id === featureId ? { ...f, subDetails: [...f.subDetails, subDetail] } : f
      ),
    });
  }, [room, onChange]);

  const updateSubDetail = useCallback((featureId: string, updated: SubDetail) => {
    onChange({
      ...room,
      features: room.features.map(f =>
        f.id === featureId
          ? { ...f, subDetails: f.subDetails.map(sd => (sd.id === updated.id ? updated : sd)) }
          : f
      ),
    });
  }, [room, onChange]);

  const removeSubDetail = useCallback((featureId: string, subDetailId: string) => {
    onChange({
      ...room,
      features: room.features.map(f =>
        f.id === featureId
          ? { ...f, subDetails: f.subDetails.filter(sd => sd.id !== subDetailId) }
          : f
      ),
    });
  }, [room, onChange]);

  const value: RoomContextValue = {
    room,
    updateTitle,
    updateDescription,
    toggleDark,
    addFeature,
    updateFeature,
    removeFeature,
    addSubDetail,
    updateSubDetail,
    removeSubDetail,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom(): RoomContextValue {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error('useRoom must be used within a RoomProvider');
  return ctx;
}