import { Button, Dialog, Input, MenuItem, Select } from '@material-ui/core';
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
  label?: string;
  className?: string;
}

const MapEdit: FC<DoorEditProps> = ({
  open,
  onClose,
  map,
  dispatch,
  label = 'Save',
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
        <Input value={name} onChange={(e) => setName(e.target.value)} />
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
        >
          {label}
        </Button>
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
