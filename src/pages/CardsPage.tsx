import React, { FC, useState, KeyboardEvent } from 'react';
import { RouteProps } from 'react-router';
import {
  Input,
  IconButton,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Character } from '../logic/character';
import { getKey } from '../logic/key';
import { Div } from '../components/Div';
import CharacterPreview from '../components/CharacterPreview';
import { Card, useDeck } from '../logic/useDeck';
import { CardView } from '../components/CardView';

const CardsPage: FC<RouteProps> = () => {
  const classes = useStyles();
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [name, setName] = useState('');
  const { deck, draw, shuffle } = useDeck();

  const addCharacter = () => {
    if (name.length > 0) {
      setName('');
      setCharacters([
        ...characters,
        { character: { key: getKey(), name }, slots: 1, cards: [] },
      ]);
    }
  };

  const removeCharacter = (key: string) => {
    const index = characters.findIndex(
      ({ character }) => character.key === key,
    );
    if (index >= 0) {
      const copy = [...characters];
      copy.splice(index, 1);
      setCharacters(copy);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === 'Enter') {
      addCharacter();
    }
    if (key === 'Backspace' && name === '' && characters.length > 0) {
      e.preventDefault();
      const lastCharacter = characters[characters.length - 1].character;
      removeCharacter(lastCharacter.key);
      setName(lastCharacter.name);
    }
  };

  const amountToDraw = characters.reduce((acc, next) => acc + next.slots, 0);
  const needsToShuffle = amountToDraw > deck.length;

  const dealCards = () => {
    const drawn = draw(amountToDraw);
    const newCharacters: CharacterData[] = [...characters].map(
      ({ character, slots }) => {
        return {
          character,
          slots,
          cards: drawn.splice(drawn.length - slots, slots),
        };
      },
    );
    setCharacters(newCharacters);
  };

  const clearCards = () => {
    const newCharacters: CharacterData[] = [
      ...characters,
    ].map(({ character, slots }) => ({ character, slots, cards: [] }));
    setCharacters(newCharacters);
  };

  return (
    <Div align="center" justify="flex-end" grows>
      <Div className={classes.root}>
        {characters.map(({ character, cards, slots }) => (
          <CharacterPreview
            key={character.key}
            character={character}
            onDelete={removeCharacter}
          >
            {cards.length > 0 ? (
              <Div row>
                {cards.map((card) => (
                  <CardView key={card.key} card={card} />
                ))}
              </Div>
            ) : (
              <Typography>Slots: {slots}</Typography>
            )}
          </CharacterPreview>
        ))}
        <Div row align="center" spacing className={classes.characters}>
          <Input
            value={name}
            onKeyDown={handleKey}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton size="small" onClick={addCharacter}>
            <AddIcon />
          </IconButton>
        </Div>
        <Div row spacing>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              clearCards();
              shuffle();
            }}
          >
            Shuffle
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={dealCards}
            disabled={needsToShuffle}
          >
            Deal Cards
          </Button>
        </Div>
      </Div>
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
  characters: {
    paddingBottom: theme.spacing(2),
  },
}));

interface CharacterData {
  character: Character;
  slots: number;
  cards: Card[];
}

export default CardsPage;
