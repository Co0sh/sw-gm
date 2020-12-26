import {
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import { v4 } from 'uuid';
import { asMapId, asRoomId, Map, MapId } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';
import ConfirmButton from './ConfirmButton';
import { Div } from './Div';
import { FastIconButton } from './FastIconButton';
import MapEdit from './MapEdit';
import Prompt from './Prompt';
import { cn } from '../logic/cn';

export interface MapListProps {
  maps: Map[];
  dispatch: Dispatch<MapsAction>;
  setCurrentMap: Dispatch<SetStateAction<MapId | null>>;
  className?: string;
}

const MapList: FC<MapListProps> = ({
  maps,
  dispatch,
  setCurrentMap,
  className,
}) => {
  const classes = useStyles();
  const [newOpen, setNewOpen] = useState(false);

  return (
    <Div className={cn(classes.root, className)}>
      <List>
        {maps.map((map) => (
          <MapItem
            key={String(map.id)}
            map={map}
            setCurrentMap={setCurrentMap}
            dispatch={dispatch}
          />
        ))}
      </List>
      <Div>
        <Button
          onClick={() => setNewOpen(true)}
          fullWidth
          variant="contained"
          color="primary"
        >
          Create New Map
        </Button>
        <Prompt
          onSave={(name) => {
            const mapId = asMapId(v4());
            const roomId = asRoomId(v4());
            dispatch({ type: 'create', name, mapId, roomId });
          }}
          open={newOpen}
          onClose={() => setNewOpen(false)}
          title="New Map"
          inputLabel="Name"
          saveLabel="Create"
        />
      </Div>
    </Div>
  );
};

interface MapItemProps {
  map: Map;
  setCurrentMap: Dispatch<SetStateAction<MapId | null>>;
  dispatch: Dispatch<MapsAction>;
}

const MapItem: FC<MapItemProps> = ({ map, setCurrentMap, dispatch }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  return (
    <ListItem button onClick={() => setCurrentMap(map.id)}>
      <ListItemText primary={<strong>{map.name}</strong>} />
      <ListItemSecondaryAction className={classes.actions}>
        <FastIconButton onClick={() => setEditing(true)}>
          <Edit />
        </FastIconButton>
        <ConfirmButton
          onClick={() => dispatch({ type: 'delete', id: map.id })}
          ButtonComponent={FastIconButton}
          title="Delete Map"
          confirmLabel="Delete"
        >
          <Delete />
        </ConfirmButton>
        <MapEdit
          open={editing}
          onClose={() => setEditing(false)}
          dispatch={dispatch}
          map={map}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  actions: {
    display: 'flex',
  },
}));

export default memo(MapList);
