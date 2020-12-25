import { Button, Typography } from '@material-ui/core';
import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react';
import { Door, Map, Room, RoomId } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';

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
  const [editing, setEditing] = useState(false);
  const nameRef = useRef<HTMLParagraphElement>(null);
  return (
    <>
      <Button onClick={() => setCurrentRoom(door.targetRoom)}>
        {map.rooms.find((r) => r.id === door.targetRoom)?.name}
      </Button>
      <Typography
        ref={nameRef}
        contentEditable={editing}
        dangerouslySetInnerHTML={{ __html: door.name }}
      />
      <Button
        onClick={() => {
          if (editing) {
            dispatch({
              type: 'editDoor',
              name: nameRef.current?.innerHTML ?? '',
              mapId: map.id,
              roomId: room.id,
              doorId: door.id,
              targetRoomId: door.targetRoom,
            });
          }
          setEditing(!editing);
        }}
      >
        {editing ? 'Save' : 'Edit'}
      </Button>
      <Button
        onClick={() =>
          dispatch({
            type: 'deleteDoor',
            mapId: map.id,
            roomId: room.id,
            doorId: door.id,
          })
        }
      >
        Delete
      </Button>
    </>
  );
};

export default memo(DoorItem);
