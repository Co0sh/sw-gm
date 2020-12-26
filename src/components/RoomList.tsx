import { Dialog, List, makeStyles, Typography } from '@material-ui/core';
import { Dispatch, FC, memo } from 'react';
import { MapsAction } from '../logic/maps.reducer';
import { Map, RoomId } from '../model/map.model';
import RoomItem from './RoomItem';

export interface RoomListProps {
  map: Map;
  open: boolean;
  onClose: () => void;
  setCurrentRoom: (roomId: RoomId) => void;
  dispatch: Dispatch<MapsAction>;
}

const RoomList: FC<RoomListProps> = ({
  map,
  open,
  onClose,
  setCurrentRoom,
  dispatch,
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Rooms
      </Typography>
      <List>
        {map.rooms.map((room) => (
          <RoomItem
            key={String(room.id)}
            onClick={() => {
              setCurrentRoom(room.id);
              onClose();
            }}
            map={map}
            room={room}
            dispatch={dispatch}
          />
        ))}
      </List>
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

export default memo(RoomList);
