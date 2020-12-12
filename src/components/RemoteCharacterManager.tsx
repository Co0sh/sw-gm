import Axios from 'axios';
import React, { FC, useState } from 'react';
import { useQuery, useMutation, useQueryCache } from 'react-query';
import { API } from '../logic/api';
import { Character, CharacterId, PartialCharacter } from '../logic/character';
import { CharacterContext } from '../logic/CharacterContext';

interface RemoteCharacterManagerProps {
  room: string;
}

const RemoteCharacterManager: FC<RemoteCharacterManagerProps> = ({
  room,
  children,
}) => {
  const cache = useQueryCache();

  const { data: list, isLoading: listLoading, error: listError } = useQuery(
    ['list-characters', { room }],
    (_, { room }) => getCharacters({ room }),
  );

  const [create] = useMutation(
    ({ character }: { character: Character }) =>
      addCharacter({ room, character }),
    {
      onSuccess: (character) => {
        cache.setQueryData(
          ['character', { room, characterId: character.id }],
          character,
        );
      },
    },
  );

  const [edit] = useMutation(
    ({
      characterId,
      character,
    }: {
      characterId: CharacterId;
      character: Character;
    }) => editCharacter({ room, characterId, character }),
    {
      onSuccess: (character) => {
        cache.setQueryData(
          ['character', { room, characterId: character.id }],
          character,
        );
      },
    },
  );

  const [currentCharacter, setCurrentCharacter] = useState<CharacterId | null>(
    null,
  );

  const {
    data: character,
    isLoading: characterLoading,
    error: characterError,
  } = useQuery(
    ['character', { room, characterId: currentCharacter }],
    (_, { room, characterId }) => getCharacter({ room, characterId }),
    { enabled: currentCharacter },
  );

  return (
    <CharacterContext.Provider
      value={{
        room,
        list,
        listLoading,
        listError,
        character,
        characterLoading,
        characterError,
        create,
        edit,
        get: setCurrentCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

const getCharacters = async ({
  room,
}: {
  room: string;
}): Promise<PartialCharacter[]> => {
  const res = await Axios.get(`${API}/rooms/${room}/characters`);
  return res.data;
};

const addCharacter = async ({
  room,
  character,
}: {
  room: string;
  character: Character;
}): Promise<Character> => {
  const res = await Axios.post(`${API}/rooms/${room}/characters`, character);
  return res.data;
};

const getCharacter = async ({
  room,
  characterId,
}: {
  room: string;
  characterId: CharacterId;
}): Promise<Character> => {
  const res = await Axios.get(`${API}/rooms/${room}/characters/${characterId}`);
  return res.data;
};

const editCharacter = async ({
  room,
  characterId,
  character,
}: {
  room: string;
  characterId: CharacterId;
  character: Character;
}): Promise<Character> => {
  const res = await Axios.post(
    `${API}/rooms/${room}/characters/${characterId}`,
    character,
  );
  return res.data;
};

export default RemoteCharacterManager;
