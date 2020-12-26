import { List, makeStyles, Typography } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Back from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import Save from '@material-ui/icons/Save';
import Edit from '@material-ui/icons/Edit';
import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react';
import { v4 } from 'uuid';
import DoorItem from './DoorItem';
import { asDoorId, Map, MapId } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';
import ConfirmButton from './ConfirmButton';
import { FastIconButton } from './FastIconButton';
import { Div } from './Div';
import DoorEdit from './DoorEdit';
import { cn } from '../logic/cn';

export interface MapViewProps {
  map: Map;
  dispatch: Dispatch<MapsAction>;
  setCurrentMap: Dispatch<SetStateAction<MapId | null>>;
  className?: string;
}

const MapView: FC<MapViewProps> = ({
  map,
  setCurrentMap,
  dispatch,
  className,
}) => {
  const classes = useStyles();
  const [newDoorOpen, setNewDoorOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(map.startingRoom);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const room = map.rooms.find((r) => r.id === currentRoom);

  if (!room) {
    throw new Error("Room doesn't exist");
  }

  return (
    <>
      <Div grows spacing className={cn(classes.root, className)}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          color="primary"
        >
          {map.name}
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          contentEditable={editing}
          ref={nameRef}
          dangerouslySetInnerHTML={{ __html: room.name }}
          color="secondary"
        />
        <Typography
          contentEditable={editing}
          ref={descriptionRef}
          dangerouslySetInnerHTML={{ __html: room.description }}
        />
        <List className={classes.list}>
          {room.doors.map((door) => {
            return (
              <DoorItem
                key={String(door.id)}
                map={map}
                room={room}
                door={door}
                setCurrentRoom={setCurrentRoom}
                dispatch={dispatch}
              />
            );
          })}
        </List>
        <DoorEdit
          key={String(newDoorOpen)}
          open={newDoorOpen}
          dispatch={dispatch}
          onClose={() => setNewDoorOpen(false)}
          map={map}
          room={room}
          label="Create Door"
          confirmLabel="Create"
          onSave={(name, targetRoomId) => {
            const doorId = asDoorId(v4());
            const backDoorId = asDoorId(v4());
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
              doorId: backDoorId,
              mapId: map.id,
              name: 'Back',
              targetRoomId: room.id,
            });
            setNewDoorOpen(false);
          }}
        />
      </Div>
      <Div row spacing justify="center" className={classes.sticky}>
        <FastIconButton onClick={() => setCurrentMap(null)}>
          <Back />
        </FastIconButton>
        <FastIconButton onClick={() => setNewDoorOpen(true)}>
          <Add />
        </FastIconButton>
        <ConfirmButton
          onClick={() => {
            dispatch({ type: 'deleteRoom', roomId: room.id, map: map.id });
            setCurrentRoom(map.startingRoom);
          }}
          disabled={room.id === map.startingRoom}
          ButtonComponent={FastIconButton}
          title="Delete Room?"
        >
          <Delete />
        </ConfirmButton>
        <FastIconButton
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
          {editing ? <Save /> : <Edit />}
        </FastIconButton>
      </Div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
  },
  root: {
    padding: theme.spacing(1),
  },
  sticky: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
    position: 'sticky',
    background: theme.palette.background.default,
    bottom: 0,
  },
}));

export default memo(MapView);
