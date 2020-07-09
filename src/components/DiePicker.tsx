import React, { FC } from 'react';
import { Box, IconButton, Typography, Chip } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import { Die, DIE_TYPES } from '../logic/die';

interface DiePickerProps {
  title?: string;
  die: Die;
  setDie: (die: Die) => void;
}

const DiePicker: FC<DiePickerProps> = ({ title, die, setDie }) => {
  const dieIndex = DIE_TYPES.indexOf(die);

  const isFirst = dieIndex === 0;
  const isLast = dieIndex === DIE_TYPES.length - 1;

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" flexGrow={1}>
        {title && <Chip label={title} />}
      </Box>
      <IconButton
        size="small"
        disabled={isFirst}
        onClick={() => setDie(DIE_TYPES[dieIndex - 1])}
      >
        <MinusIcon />
      </IconButton>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={40}
      >
        <Typography variant="h5" component="span">
          {die}
        </Typography>
      </Box>
      <IconButton
        size="small"
        disabled={isLast}
        onClick={() => setDie(DIE_TYPES[dieIndex + 1])}
      >
        <PlusIcon />
      </IconButton>
    </Box>
  );
};

export default DiePicker;
