import React, { FC, useState, KeyboardEvent, useRef, useEffect } from 'react';
import {
  Dialog,
  makeStyles,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { cn } from '../logic/cn';
import { Div } from './Div';

export interface CharacterImageEditDialogProps {
  open: boolean;
  initialValue?: string;
  onAccept: (src: string) => void;
  onClose: () => void;
  className?: string;
}

export const CharacterImageEditDialog: FC<CharacterImageEditDialogProps> = ({
  open,
  initialValue,
  onAccept,
  onClose,
  className,
}) => {
  const classes = useStyles();
  const [src, setSrc] = useState(initialValue ?? '');

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    if (src) {
      onAccept(src);
    }
    onClose();
  };

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSave();
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
          Edit Image
        </Typography>
        <TextField
          onChange={(e) => setSrc(e.target.value)}
          label="Link"
          autoFocus
          inputRef={inputRef}
          value={src}
          onKeyDown={handleKey}
        />
        <Div row spacing>
          <Button fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={handleSave}
            disabled={!src}
            color="secondary"
            variant="contained"
          >
            Save
          </Button>
        </Div>
      </Div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: 600,
  },
}));
