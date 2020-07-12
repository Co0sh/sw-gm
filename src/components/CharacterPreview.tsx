import React, { FC } from 'react';
import { Character } from '../logic/character';
import { Div } from './Div';
import { Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface CharacterPreviewProps {
  character: Character;
  onDelete?: (key: string) => void;
}

const CharacterPreview: FC<CharacterPreviewProps> = ({
  character,
  onDelete,
  children,
}) => {
  const { name, key } = character;
  return (
    <Div row align="center">
      <IconButton size="small" onClick={() => onDelete?.(key)}>
        <DeleteIcon />
      </IconButton>
      <Div row>
        <Typography>{name}</Typography>
        {children}
      </Div>
    </Div>
  );
};

export default CharacterPreview;
