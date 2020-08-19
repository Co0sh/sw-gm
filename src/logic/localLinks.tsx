import React from 'react';
import SvgIcon from '@material-ui/icons/People';
import CharactersIcon from '@material-ui/icons/Accessibility';
import RoomsIcon from '@material-ui/icons/People';
import { DiceIcons } from '../logic/diceIcons';
import { ReactComponent as CardsIcon } from '../assets/cards.svg';

export const localLinks = [
  {
    label: 'Dice',
    url: '/',
    icon: <SvgIcon component={DiceIcons[12]} viewBox="0 0 100 100" />,
  },
  {
    label: 'Cards',
    url: '/cards',
    icon: <SvgIcon component={CardsIcon} viewBox="0 0 100 100" />,
  },
  {
    label: 'Characters',
    url: '/characters',
    icon: <SvgIcon component={CharactersIcon} />,
  },
  {
    label: 'Tables',
    url: '/tables',
    icon: <SvgIcon component={RoomsIcon} />,
  },
];
