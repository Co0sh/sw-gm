import React, { FC, useState, useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { makeStyles, Button, CircularProgress } from '@material-ui/core';
import { Div } from '../components/Div';
import { Character } from '../logic/character';
import { CharacterSheetHeader } from '../components/CharacterSheetHeader';
import { Link } from 'react-router-dom';
import { NewCharacterDialog } from '../components/NewCharacterDialog';
import { CharacterContext } from '../logic/CharacterContext';

const CharactersPage: FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const { url } = useRouteMatch();

  const { room, list: characters, create, get } = useContext(CharacterContext);

  const addCharacter = (character: Character) => {
    create({ character });
    if (room) {
      push(`/tables/${room}/characters/${character.id}`);
    } else {
      push(`/characters/${character.id}`);
    }
  };

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  if (!characters) {
    return <CircularProgress />;
  }

  return (
    <Div justify="flex-end" align="center" grows>
      <Div className={classes.content} spacing>
        {characters.map((character) => {
          return (
            <Link
              key={String(character.id)}
              to={`${url}/${character.id}`}
              onClick={() => get(character.id)}
              className={classes.link}
            >
              <CharacterSheetHeader character={character} />
            </Link>
          );
        })}
        <Button
          color="primary"
          fullWidth
          onClick={() => setAddDialogOpen(true)}
        >
          Add Character
        </Button>
      </Div>
      <NewCharacterDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAccept={addCharacter}
      />
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

export default CharactersPage;
