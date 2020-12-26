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
import { v4 } from 'uuid';
import { cn } from '../logic/cn';
import { MapsAction } from '../logic/maps.reducer';
import {
  asDoorId,
  asRoomId,
  Door,
  Map,
  Room,
  RoomId,
} from '../model/map.model';
import { Div } from './Div';

export interface DoorEditProps {
  map: Map;
  room: Room;
  door?: Door;
  open: boolean;
  onClose: () => void;
  onSave: (name: string, targetRoom: RoomId | undefined) => void;
  dispatch: Dispatch<MapsAction>;
  label?: string;
  confirmLabel?: string;
  className?: string;
}

const DoorEdit: FC<DoorEditProps> = ({
  open,
  onClose,
  onSave,
  door,
  room,
  map,
  dispatch,
  label = 'Edit Door',
  confirmLabel = 'Save',
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
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {label}
        </Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Door Name"
          autoFocus
        />
        <FormControl>
          <InputLabel shrink>Target Room</InputLabel>
          <Select
            value={String(targetRoom)}
            displayEmpty
            onChange={(e) => setTargetRoom(e.target.value as any)}
          >
            {map.rooms
              .filter((r) => r.id !== room.id)
              .map((r) => (
                <MenuItem value={String(r.id)} key={String(r.id)}>
                  {r.name}
                </MenuItem>
              ))}
            <MenuItem value="">
              <em>New Room</em>
            </MenuItem>
          </Select>
        </FormControl>
        {!targetRoom && (
          <TextField
            value={targetRoomName}
            onChange={(e) => setTargetRoomName(e.target.value)}
            label="New Room Name"
          />
        )}
        <Div row spacing>
          <Button onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const targetRoomId =
                targetRoomName || targetRoom
                  ? asRoomId(targetRoom ? targetRoom : v4())
                  : undefined;
              if (!targetRoom && targetRoomId) {
                dispatch({
                  type: 'createRoom',
                  name: targetRoomName,
                  map: map.id,
                  roomId: targetRoomId,
                });
                const backDoorId = asDoorId(v4());
                dispatch({
                  type: 'createDoor',
                  roomId: targetRoomId,
                  doorId: backDoorId,
                  mapId: map.id,
                  name: 'Back',
                  targetRoomId: room.id,
                });
              }
              onSave(name, targetRoomId);
            }}
            disabled={!name}
            variant="contained"
            color="primary"
            fullWidth
          >
            {confirmLabel}
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

export default memo(DoorEdit);
