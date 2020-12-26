import React, { FC, useEffect, memo, useCallback, useContext } from 'react';
import {
  makeStyles,
  Button,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import LeftIcon from '@material-ui/icons/ArrowLeft';
import RightIcon from '@material-ui/icons/ArrowRight';
import ListIcon from '@material-ui/icons/Menu';
import { Link, useRouteMatch } from 'react-router-dom';
import CharacterSheet from '../components/CharacterSheet';
import { Div } from '../components/Div';
import { Character } from '../logic/character';
import { CharacterContext } from '../logic/CharacterContext';

const CharacterPage: FC<any> = ({ match }) => {
  const classes = useStyles();
  const { characterId } = match.params;
  const { url } = useRouteMatch();

  const { get, character, edit, list: characters } = useContext(
    CharacterContext
  );

  useEffect(() => {
    get(characterId);
  }, [characterId, get]);

  const setCharacter = useCallback(
    (c: Character) => {
      edit({ character: c, characterId: c.id });
    },
    [edit]
  );

  if (!characters || !character) {
    return <CircularProgress />;
  }

  const characterIndex = characters.findIndex(({ id }) => id === characterId);
  const next = characters[(characterIndex + 1) % characters.length];
  const prev =
    characters[(characterIndex + characters.length - 1) % characters.length];

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
          to={`${url.slice(0, url.lastIndexOf('/'))}/${prev.id}`}
        >
          {prev.name}
        </Button>
        <IconButton
          component={Link}
          to={`${url.slice(0, url.lastIndexOf('/'))}`}
          aria-label="List"
        >
          <ListIcon />
        </IconButton>
        <Button
          fullWidth
          endIcon={<RightIcon />}
          component={Link}
          to={`${url.slice(0, url.lastIndexOf('/'))}/${next.id}`}
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
    bottom: 0,
  },
}));

export default memo(CharacterPage);
