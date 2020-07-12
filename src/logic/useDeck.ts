import { useState, useCallback } from 'react';

export type CardSuit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export const CARD_SUIT: CardSuit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

export type CardRank =
  | 'ace'
  | 'king'
  | 'queen'
  | 'jack'
  | '10'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';

export const CARD_RANK: CardRank[] = [
  'ace',
  'king',
  'queen',
  'jack',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];

type CardColor = 'red' | 'black';

export interface CardRegular {
  key: string;
  type: 'regular';
  suit: CardSuit;
  rank: CardRank;
}

export interface CardJoker {
  key: string;
  type: 'joker';
  color: CardColor;
}

export type Card = CardRegular | CardJoker;

export const createDeck = (): Card[] => {
  let key = 0;
  const result: Card[] = [];
  CARD_SUIT.forEach((suit) =>
    CARD_RANK.forEach((rank) =>
      result.push({ key: String(key++), type: 'regular', suit, rank }),
    ),
  );
  result.push({ key: String(key++), type: 'joker', color: 'red' });
  result.push({ key: String(key++), type: 'joker', color: 'black' });
  return result;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const copy = [...deck];
  const picked: Card[] = [];
  while (copy.length > 0) {
    const pick = Math.floor(Math.random() * copy.length);
    const [card] = copy.splice(pick, 1);
    picked.push(card);
  }
  return picked;
};

export const useDeck = () => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const draw = useCallback(
    (count: number) => {
      const copy = [...deck];
      const picked = copy.splice(copy.length - count, count);
      setDeck(copy);
      return picked;
    },
    [deck],
  );
  const shuffle = useCallback(() => {
    setDeck(shuffleDeck(createDeck()));
  }, []);

  return { deck, draw, shuffle };
};
