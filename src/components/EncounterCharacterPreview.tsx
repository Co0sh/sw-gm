import React, { FC } from 'react';
import { Character } from '../logic/character';
import { Div } from './Div';
import { Typography, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface CharacterPreviewProps {
  character: Character;
  onDelete?: (key: string) => void;
}

const EncounterCharacterPreview: FC<CharacterPreviewProps> = ({
  character,
  onDelete,
  children,
}) => {
  const classes = useStyles();
  const { name, key } = character;
  return (
    <Div row align="center" className={classes.root} spacing>
      <IconButton size="small" onClick={() => onDelete?.(key)}>
        <DeleteIcon />
      </IconButton>
      <Div row grows align="center">
        <Typography variant="h5" component="span">
          {name}
        </Typography>
        {children}
      </Div>
    </Div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default EncounterCharacterPreview;
