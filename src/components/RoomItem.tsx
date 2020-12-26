import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Dispatch, FC, memo } from 'react';
import Delete from '@material-ui/icons/Delete';
import ConfirmButton from './ConfirmButton';
import { Map, Room } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';
import { FastIconButton } from './FastIconButton';

interface RoomItemProps {
  room: Room;
  map: Map;
  onClick: () => void;
  dispatch: Dispatch<MapsAction>;
}

const RoomItem: FC<RoomItemProps> = ({ room, map, onClick, dispatch }) => {
  const otherRooms = map.rooms.filter((r) => r.id !== room.id);
  const hasEntrances = otherRooms.some((r) =>
    r.doors.find((d) => d.targetRoom === room.id)
  );
  const hasExits = room.doors.length > 0;
  const hasDoorsWithoutTarget = room.doors.some((d) => !d.targetRoom);
  const issues = [
    !hasEntrances && 'No Entrances',
    !hasExits && 'No Exits',
    hasDoorsWithoutTarget && 'Empty Doors',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <ListItem button onClick={onClick}>
      <ListItemText
        primary={room.name}
        secondary={issues ? issues : undefined}
        secondaryTypographyProps={{ color: 'error' }}
      />
      <ListItemSecondaryAction>
        <ConfirmButton
          onClick={() => {
            dispatch({
              type: 'deleteRoom',
              map: map.id,
              roomId: room.id,
            });
          }}
          ButtonComponent={FastIconButton}
          title="Delete Room"
          confirmLabel="Delete"
        >
          <Delete />
        </ConfirmButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(RoomItem);
