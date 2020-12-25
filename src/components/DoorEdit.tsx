import { Button, Dialog, Input, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Dispatch, FC, memo, useState } from 'react';
import { v4 } from 'uuid';
import { cn } from '../logic/cn';
import { MapsAction } from '../logic/maps.reducer';
import { asRoomId, Door, Map, RoomId } from '../model/map.model';
import { Div } from './Div';

export interface DoorEditProps {
  map: Map;
  door?: Door;
  open: boolean;
  onClose: () => void;
  onSave: (name: string, targetRoom: RoomId) => void;
  dispatch: Dispatch<MapsAction>;
  label?: string;
  className?: string;
}

const DoorEdit: FC<DoorEditProps> = ({
  open,
  onClose,
  onSave,
  door,
  map,
  dispatch,
  label = 'Save',
  className,
}) => {
  const classes = useStyles();
  const [name, setName] = useState(door?.name ?? '');
  const [targetRoom, setTargetRoom] = useState(String(door?.targetRoom ?? ''));
  const [targetRoomName, setTargetRoomName] = useState('');
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: cn(classes.root, className) }}
    >
      <Div spacing>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Select
          value={String(targetRoom)}
          displayEmpty
          onChange={(e) => setTargetRoom(e.target.value as any)}
        >
          {map.rooms.map((r) => (
            <MenuItem value={String(r.id)} key={String(r.id)}>
              {r.name}
            </MenuItem>
          ))}
          <MenuItem value="">New Room</MenuItem>
        </Select>
        {!targetRoom && (
          <Input
            value={targetRoomName}
            onChange={(e) => setTargetRoomName(e.target.value)}
          />
        )}
        <Button
          onClick={() => {
            const targetRoomId = asRoomId(targetRoom ? targetRoom : v4());
            if (!targetRoom) {
              dispatch({
                type: 'createRoom',
                name: targetRoomName,
                map: map.id,
                roomId: targetRoomId,
              });
            }
            onSave(name, targetRoomId);
          }}
          disabled={!name || (!targetRoom && !targetRoomName)}
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

export default memo(DoorEdit);
