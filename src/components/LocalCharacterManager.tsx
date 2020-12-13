import React, { FC, useCallback, useEffect, useState } from 'react';
import { Character, CharacterId } from '../logic/character';
import { CharacterContext } from '../logic/CharacterContext';

const LocalCharacterManager: FC = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>(() =>
    JSON.parse(localStorage.getItem('characters') ?? '[]'),
  );

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  const [currentCharacter, setCurrentCharacter] = useState<CharacterId | null>(
    null,
  );

  const setCharacter = useCallback((c: Character) => {
    setCharacters((prev) => {
      const index = prev.findIndex(({ id }) => id === c.id);
      if (index < 0) {
        return [...prev, c];
      }
      const copy = [...prev];
      copy.splice(index, 1, c);
      return copy;
    });
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        room: undefined,
        list: characters,
        listLoading: false,
        listError: undefined,
        character: characters.find(({ id }) => id === currentCharacter),
        characterLoading: false,
        characterError: undefined,
        create: ({ character }) => setCharacter(character),
        edit: ({ character }) => setCharacter(character),
        get: setCurrentCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default LocalCharacterManager;
