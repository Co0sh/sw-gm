import { Box, Button, Input, List, ListItem } from '@material-ui/core';
import { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import { v4 } from 'uuid';
import { asMapId, asRoomId, Map, MapId } from '../model/map.model';
import { MapsAction } from '../logic/maps.reducer';

export interface MapListProps {
  maps: Map[];
  dispatch: Dispatch<MapsAction>;
  setCurrentMap: Dispatch<SetStateAction<MapId | null>>;
}

const MapList: FC<MapListProps> = ({ maps, dispatch, setCurrentMap }) => {
  const [name, setName] = useState('');

  return (
    <Box>
      <List>
        {maps.map((map) => (
          <ListItem key={String(map.id)}>
            <Button onClick={() => setCurrentMap(map.id)}>
              View {map.name}
            </Button>
            <Button onClick={() => dispatch({ type: 'delete', id: map.id })}>
              Delete {map.name}
            </Button>
          </ListItem>
        ))}
      </List>
      <Box>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          onClick={() => {
            const mapId = asMapId(v4());
            const roomId = asRoomId(v4());
            dispatch({ type: 'create', name, mapId, roomId });
            setName('');
            setCurrentMap(mapId);
          }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default memo(MapList);
