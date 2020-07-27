import React, { FC } from 'react';
import { RouteProps } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { CharacterSheet } from '../components/CharacterSheet';
import { exampleCharacter } from '../exampleData';
import { Div } from '../components/Div';

export const CharactersPage: FC<RouteProps> = () => {
  const classes = useStyles();

  return (
    <Div justify="flex-end" align="center" grows>
      <CharacterSheet
        character={exampleCharacter}
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
  },
}));
