import React, { FC, useState, useEffect } from 'react';
import { RouteProps } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { CharacterSheet } from '../components/CharacterSheet';
import { Div } from '../components/Div';
import { Character } from '../logic/character';
import { exampleCharacter } from '../exampleData';

export const CharactersPage: FC<RouteProps> = () => {
  const classes = useStyles();

  const [character, setCharacter] = useState<Character | null>(
    JSON.parse(localStorage.getItem('character') ?? 'null'),
  );

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
  }, [character]);

  return (
    <Div justify="flex-end" align="center" grows>
      <CharacterSheet
        character={character ?? exampleCharacter}
        onChange={setCharacter}
        className={classes.content}
      />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
    paddingTop: 0,
    flexGrow: 1,
  },
}));
