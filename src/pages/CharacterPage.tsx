import React, { FC, useState, useEffect } from 'react';
import { makeStyles, Typography, Button, IconButton } from '@material-ui/core';
import LeftIcon from '@material-ui/icons/ArrowLeft';
import RightIcon from '@material-ui/icons/ArrowRight';
import ListIcon from '@material-ui/icons/Menu';
import { CharacterSheet } from '../components/CharacterSheet';
import { Div } from '../components/Div';
import { Character } from '../logic/character';
import { Link } from 'react-router-dom';

export const CharacterPage: FC<any> = ({ match }) => {
  const classes = useStyles();
  const { characterId } = match.params;

  const [characters, setCharacters] = useState<Character[]>(
    JSON.parse(localStorage.getItem('characters') ?? '[]'),
  );

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  const characterIndex = characters.findIndex(({ id }) => id === characterId);
  const character = characters[characterIndex];
  const next = characters[(characterIndex + 1) % characters.length];
  const prev =
    characters[(characterIndex + characters.length - 1) % characters.length];

  const setCharacter = (c: Character) => {
    const index = characters.findIndex(({ id }) => id === c.id);
    if (index < 0) {
      return;
    }
    const copy = [...characters];
    copy.splice(index, 1, c);
    setCharacters(copy);
  };

  if (!character) {
    return (
      <Typography variant="h3" component="h1">
        Not found
      </Typography>
    );
  }

  return (
    <Div justify="flex-end" align="center" grows>
      <CharacterSheet
        character={character}
        onChange={setCharacter}
        className={classes.content}
      />
      <Div row spacing className={classes.buttonBar}>
        <Button
          fullWidth
          startIcon={<LeftIcon />}
          component={Link}
          to={`/characters/${prev.id}`}
        >
          {prev.name}
        </Button>
        <IconButton component={Link} to="/characters">
          <ListIcon />
        </IconButton>
        <Button
          fullWidth
          endIcon={<RightIcon />}
          component={Link}
          to={`/characters/${next.id}`}
        >
          {next.name}
        </Button>
      </Div>
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
    position: 'relative',
  },
  buttonBar: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
    position: 'sticky',
    background: theme.palette.background.default,
    bottom: 56,
  },
}));
