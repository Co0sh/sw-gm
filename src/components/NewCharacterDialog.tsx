import React, { FC, useState, KeyboardEvent } from 'react';
import { Character } from '../logic/character';
import {
  Dialog,
  makeStyles,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { cn } from '../logic/cn';
import { Div } from './Div';
import { useCreateCharacter } from '../logic/useCreateCharacter';

export interface NewCharacterDialogProps {
  open: boolean;
  onAccept: (character: Character) => void;
  onClose: () => void;
  className?: string;
}

export const NewCharacterDialog: FC<NewCharacterDialogProps> = ({
  open,
  onAccept,
  onClose,
  className,
}) => {
  const classes = useStyles();
  const createCharacter = useCreateCharacter();
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name) {
      onAccept(createCharacter({ name }));
    }
  };

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: cn(classes.root, className) }}
    >
      <Div spacing>
        <Typography variant="h4" component="h1" align="center">
          New Character
        </Typography>
        <TextField
          onChange={(e) => setName(e.target.value)}
          label="Name"
          autoFocus
          onKeyDown={handleKey}
        />
        <Div row spacing>
          <Button fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleCreate} disabled={!name}>
            Create
          </Button>
        </Div>
      </Div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: 360,
  },
}));
