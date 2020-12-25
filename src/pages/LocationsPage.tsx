import React, { FC, useEffect, useReducer, useState } from 'react';
import { RouteProps } from 'react-router';
import { mapsReducer } from '../logic/maps.reducer';
import { MapId } from '../model/map.model';
import MapView from '../components/MapView';
import MapList from '../components/MapList';
import { Div } from '../components/Div';
import { makeStyles } from '@material-ui/core';

const LocationsPage: FC<RouteProps> = () => {
  const classes = useStyles();
  const [maps, dispatch] = useReducer(mapsReducer, [], () => {
    const json = localStorage.getItem('maps');
    if (!json) {
      return [];
    }
    return JSON.parse(json);
  });
  const [currentMap, setCurrentMap] = useState<MapId | null>(null);
  const map = maps.find((m) => m.id === currentMap);

  useEffect(() => {
    localStorage.setItem('maps', JSON.stringify(maps));
  }, [maps]);

  if (map) {
    return (
      <Div justify="flex-end" align="center" grows>
        <MapView
          map={map}
          dispatch={dispatch}
          setCurrentMap={setCurrentMap}
          className={classes.root}
        />
      </Div>
    );
  }

  return (
    <Div justify="flex-end" align="center" grows>
      <MapList
        maps={maps}
        dispatch={dispatch}
        setCurrentMap={setCurrentMap}
        className={classes.root}
      />
    </Div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
  },
}));

export default LocationsPage;
