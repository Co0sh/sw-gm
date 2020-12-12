import { createContext } from 'react';
import { Character, CharacterId, PartialCharacter } from './character';

export interface CharacterContextType {
  room: string | undefined;
  list: PartialCharacter[] | undefined;
  listLoading: boolean;
  listError: any;
  character: Character | undefined;
  characterLoading: boolean;
  characterError: any;
  create: (data: { character: Character }) => void;
  edit: (data: { characterId: CharacterId; character: Character }) => void;
  get: (characterId: CharacterId) => void;
}

export const CharacterContext = createContext<CharacterContextType>({
  room: undefined,
  list: [],
  listLoading: false,
  listError: undefined,
  character: undefined,
  characterLoading: false,
  characterError: undefined,
  create: () => {},
  edit: () => {},
  get: () => {},
});
