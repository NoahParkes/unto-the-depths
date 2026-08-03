import type { Feature } from '../types/room';

type SubDetail = Feature['subDetails'][number]; // Note | Check
type Note = Extract<SubDetail, { type: 'note' }>;
type Check = Extract<SubDetail, { type: 'check' }>;

interface SubDetailTypeConfig<T extends SubDetail> {
  label: string;
  createBlank: (id: string) => T;
}

type SubDetailRegistry = {
  [K in SubDetail['type']]: SubDetailTypeConfig<Extract<SubDetail, { type: K }>>;
};

const defaultTest = () => ({ attributeName: 'Might' as const, skill: 'Athletics' as const, difficulty: 10 });

export const subDetailRegistry: SubDetailRegistry = {
  note: {
    label: 'Note',
    createBlank: (id): Note => ({ id, type: 'note', description: '' }),
  },
  check: {
    label: 'Check',
    createBlank: (id): Check => ({ id, type: 'check', test: defaultTest(), description: '' }),
  },
};

export function createBlankSubDetail(type: SubDetail['type'], id: string): SubDetail {
  return subDetailRegistry[type].createBlank(id);
}

export function getAddableSubDetailTypes() {
  return (Object.keys(subDetailRegistry) as SubDetail['type'][]).map(type => ({
    type,
    label: subDetailRegistry[type].label,
  }));
}