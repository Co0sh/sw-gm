import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import { Door, Map, Room, RoomId } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';
import ConfirmButton from './ConfirmButton';
import { FastIconButton } from './FastIconButton';
import { makeStyles } from '@material-ui/styles';
import DoorEdit from './DoorEdit';

export interface DoorItemProps {
  map: Map;
  room: Room;
  door: Door;
  setCurrentRoom: Dispatch<SetStateAction<RoomId>>;
  dispatch: Dispatch<MapsAction>;
}

const DoorItem: FC<DoorItemProps> = ({
  map,
  room,
  door,
  setCurrentRoom,
  dispatch,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  return (
    <>
      <ListItem button onClick={() => setCurrentRoom(door.targetRoom)}>
        <ListItemText
          primary={door.name}
          secondary={map.rooms.find((r) => r.id === door.targetRoom)?.name}
        />
        <ListItemSecondaryAction className={classes.actions}>
          <FastIconButton onClick={() => setEditing(true)}>
            <Edit />
          </FastIconButton>
          <ConfirmButton
            onClick={() =>
              dispatch({
                type: 'deleteDoor',
                mapId: map.id,
                roomId: room.id,
                doorId: door.id,
              })
            }
            ButtonComponent={FastIconButton}
            title="Delete Door"
            confirmLabel="Delete"
            additionalActions={[
              ...(door.targetRoom !== map.startingRoom &&
              map.rooms
                .find((r) => r.id === door.targetRoom)
                ?.doors.filter((d) => d.targetRoom !== room.id).length === 0
                ? [
                    {
                      id: 'delete' as any,
                      text: 'Delete the target room',
                      action: () => {
                        dispatch({
                          type: 'deleteRoom',
                          map: map.id,
                          roomId: door.targetRoom,
                        });
                      },
                    },
                  ]
                : []),
            ]}
          >
            <Delete />
          </ConfirmButton>
          <DoorEdit
            open={editing}
            onClose={() => setEditing(false)}
            map={map}
            room={room}
            door={door}
            dispatch={dispatch}
            onSave={(name, targetRoom) => {
              dispatch({
                type: 'editDoor',
                name: name,
                mapId: map.id,
                roomId: room.id,
                doorId: door.id,
                targetRoomId: targetRoom,
              });
              setEditing(false);
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  actions: {
    display: 'flex',
  },
}));

export default memo(DoorItem);
