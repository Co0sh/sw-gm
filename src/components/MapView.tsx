import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react';
import { v4 } from 'uuid';
import DoorItem from './DoorItem';
import { asDoorId, asRoomId, Map, MapId } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';

export interface MapViewProps {
  map: Map;
  dispatch: Dispatch<MapsAction>;
  setCurrentMap: Dispatch<SetStateAction<MapId | null>>;
}

const MapView: FC<MapViewProps> = ({ map, setCurrentMap, dispatch }) => {
  const [name, setName] = useState('');
  const [targetRoom, setTargetRoom] = useState('');
  const [targetRoomName, setTargetRoomName] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(map.startingRoom);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const room = map.rooms.find((r) => r.id === currentRoom);

  if (!room) {
    throw new Error("Room doesn't exist");
  }

  return (
    <Box>
      <Typography variant="h1">{map.name}</Typography>
      <Typography
        variant="h2"
        contentEditable={editing}
        ref={nameRef}
        dangerouslySetInnerHTML={{ __html: room.name }}
      />
      <Typography
        contentEditable={editing}
        ref={descriptionRef}
        dangerouslySetInnerHTML={{ __html: room.description }}
      />
      <Button
        onClick={() => {
          if (editing) {
            dispatch({
              type: 'editRoom',
              roomId: room.id,
              mapId: map.id,
              name: nameRef.current?.innerHTML ?? '',
              description: descriptionRef.current?.innerHTML ?? '',
            });
          }
          setEditing(!editing);
        }}
      >
        {editing ? 'Save' : 'Edit'}
      </Button>
      <List>
        {room.doors.map((door) => (
          <ListItem key={String(door.id)}>
            <DoorItem
              map={map}
              room={room}
              door={door}
              setCurrentRoom={setCurrentRoom}
              dispatch={dispatch}
            />
          </ListItem>
        ))}
      </List>
      <Box>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Select
          value={String(targetRoom)}
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
            const doorId = asDoorId(v4());
            const targetRoomId = asRoomId(targetRoom ? targetRoom : v4());
            if (!targetRoom) {
              dispatch({
                type: 'createRoom',
                name: targetRoomName,
                map: map.id,
                roomId: targetRoomId,
              });
            }
            dispatch({
              type: 'createDoor',
              roomId: room.id,
              doorId: doorId,
              mapId: map.id,
              name,
              targetRoomId: targetRoomId,
            });
            dispatch({
              type: 'createDoor',
              roomId: targetRoomId,
              doorId: doorId,
              mapId: map.id,
              name: 'Back',
              targetRoomId: room.id,
            });
            setTargetRoomName('');
            setName('');
          }}
          disabled={!name || (!targetRoom && !targetRoomName)}
        >
          Create Door
        </Button>
      </Box>
      <Button onClick={() => setCurrentMap(null)}>Back</Button>
      <Button
        onClick={() => {
          dispatch({ type: 'deleteRoom', roomId: room.id, map: map.id });
          setCurrentRoom(map.startingRoom);
        }}
        disabled={room.id === map.startingRoom}
      >
        Delete
      </Button>
    </Box>
  );
};

export default memo(MapView);
