import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Div } from '../components/Div';
import { Character } from '../logic/character';
import { CharacterSheetHeader } from '../components/CharacterSheetHeader';
import { Link } from 'react-router-dom';
import { exampleCharacter } from '../exampleData';

export const CharactersPage: FC = () => {
  const classes = useStyles();

  const [characters] = useState<Character[]>(
    JSON.parse(
      localStorage.getItem('characters') ?? JSON.stringify([exampleCharacter]),
    ),
  );

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  return (
    <Div justify="flex-end" align="center" grows>
      <Div className={classes.content} spacing>
        {characters.map((character) => {
          return (
            <Link to={`/characters/${character.id}`} className={classes.link}>
              <CharacterSheetHeader character={character} />
            </Link>
          );
        })}
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));
