import {
  Button,
  Dialog,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { FC, useState } from 'react';
import { cn } from '../logic/cn';
import { Div } from './Div';

export interface PromptProps {
  title: string;
  description?: string;
  inputLabel?: string;
  initialValue?: string;
  onSave?: (value: string) => void;
  open: boolean;
  onClose: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  className?: string;
}

const Prompt: FC<PromptProps> = ({
  open,
  onClose,
  className,
  title,
  description,
  inputLabel,
  initialValue = '',
  onSave,
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(initialValue);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: cn(classes.root, className) }}
    >
      <Div spacing>
        <Typography variant="h4" component="h1" align="center">
          {title}
        </Typography>
        {description !== undefined && <Typography>{description}</Typography>}
        <TextField
          label={inputLabel}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Div row spacing>
          <Button onClick={onClose} fullWidth>
            {cancelLabel}
          </Button>
          <Button
            onClick={() => {
              onSave?.(value);
              onClose();
            }}
            variant="contained"
            color="primary"
            fullWidth
          >
            {saveLabel}
          </Button>
        </Div>
      </Div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(2),
  },
}));

export default Prompt;
