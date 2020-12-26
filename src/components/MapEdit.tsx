import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Dispatch, FC, memo, useState } from 'react';
import { cn } from '../logic/cn';
import { MapsAction } from '../logic/maps.reducer';
import { Map } from '../model/map.model';
import { Div } from './Div';

export interface DoorEditProps {
  map: Map;
  open: boolean;
  onClose: () => void;
  dispatch: Dispatch<MapsAction>;
  className?: string;
}

const MapEdit: FC<DoorEditProps> = ({
  open,
  onClose,
  map,
  dispatch,
  className,
}) => {
  const classes = useStyles();
  const [name, setName] = useState(map.name);
  const [startingRoom, setStartingRoom] = useState(map.startingRoom);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: cn(classes.root, className) }}
    >
      <Div spacing>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Edit Map
        </Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Map Name"
          autoFocus
        />
        <FormControl>
          <InputLabel shrink>Starting Room</InputLabel>
          <Select
            value={String(startingRoom)}
            displayEmpty
            onChange={(e) => setStartingRoom(e.target.value as any)}
          >
            {map.rooms.map((r) => (
              <MenuItem value={String(r.id)} key={String(r.id)}>
                {r.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Div row spacing>
          <Button onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch({
                type: 'edit',
                startingRoom,
                name,
                mapId: map.id,
              });
              onClose();
            }}
            disabled={!name}
            fullWidth
            variant="contained"
            color="primary"
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
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(2),
  },
}));

export default memo(MapEdit);
