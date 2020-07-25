import React, { FC, useState, KeyboardEvent, useEffect } from 'react';
import {
  Input,
  IconButton,
  Button,
  makeStyles,
  List,
  ListItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Character } from '../logic/character';
import { getKey } from '../logic/key';
import { Div } from './Div';
import EncounterCharacterPreview from './EncounterCharacterPreview';
import { Card, useDeck } from '../logic/useDeck';
import { CardView } from './CardView';
import { CardPlaceholder } from './CardPlaceholder';

export interface CharacterData {
  character: Character;
  slots: number;
  cards: Card[];
}

export interface EncounterProps {
  initialCharacters?: CharacterData[];
  initialDeck?: Card[];
  className?: string;
}

export const Encounter: FC<EncounterProps> = ({
  initialCharacters,
  initialDeck,
  className,
}) => {
  const classes = useStyles();
  const [characters, setCharacters] = useState<CharacterData[]>(
    initialCharacters ?? [],
  );
  const [name, setName] = useState('');
  const { deck, draw, shuffle } = useDeck(initialDeck);

  useEffect(() => {
    localStorage.setItem('encounter', JSON.stringify({ characters, deck }));
  }, [characters, deck]);

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

  const redrawCard = (cardKey: string) => {
    if (needsToShuffle) {
      return;
    }
    const [card] = draw();
    const characterIndex = characters.findIndex((character) =>
      character.cards.find((card) => card.key === cardKey),
    );
    const character = characters[characterIndex];
    const cardIndex = character.cards.findIndex((card) => card.key === cardKey);
    const characterCopy = { ...character };
    const copy = [...characters];
    const cardsCopy = [...characterCopy.cards];
    cardsCopy.splice(cardIndex, 1, card);
    copy.splice(characterIndex, 1, { ...character, cards: cardsCopy });
    setCharacters(copy);
  };

  return (
    <Div className={className}>
      <List>
        {characters.map(({ character, cards, slots }) => (
          <ListItem key={character.key}>
            <EncounterCharacterPreview
              character={character}
              onDelete={removeCharacter}
            >
              <Div row justify="flex-end" grows>
                {cards.length > 0
                  ? cards.map((card) => (
                      <CardView
                        key={card.key}
                        card={card}
                        onClick={() => redrawCard(card.key)}
                      />
                    ))
                  : new Array(slots)
                      .fill(null)
                      .map((_, index) => (
                        <CardPlaceholder key={index} onClick={() => {}} />
                      ))}
              </Div>
            </EncounterCharacterPreview>
          </ListItem>
        ))}
      </List>
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
  );
};

const useStyles = makeStyles((theme) => ({
  characters: {
    paddingBottom: theme.spacing(2),
  },
}));

export default Encounter;
