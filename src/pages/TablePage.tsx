import React, { FC, lazy, Suspense, useMemo } from 'react';
import SvgIcon from '@material-ui/icons/People';
import {
  Route,
  Switch,
  useRouteMatch,
  RouteProps,
  useParams,
} from 'react-router';
import CharactersIcon from '@material-ui/icons/Accessibility';
import ExitIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import { DiceIcons } from '../logic/diceIcons';
import { ReactComponent as CardsIcon } from '../assets/cards.svg';
import { TableData } from '../logic/tableData';
import { SocketManager } from '../components/SocketManager';
import { DiceRemoteHistoryManager } from '../components/DiceRemoteHistoryManager';
import { useLocalState } from '../logic/useLocalState';
import { localLinks } from '../logic/localLinks';
import { TableUserEditor } from '../components/TableUserEditor';
import { Div } from '../components/Div';
import { makeStyles } from '@material-ui/core';
import LoadingView from '../components/LoadingView';
import { useSetLinks } from '../components/NavigationManager';
import DiceManagerUsingRoute from '../components/DiceManagerUsingRoute';
import RemoteCharacterManager from '../components/RemoteCharacterManager';

const DicePage = lazy(() => import('./DicePage'));
const CardsPage = lazy(() => import('./CardsPage'));
const DiceHistoryPage = lazy(() => import('./DiceHistoryPage'));
const CharactersPage = lazy(() => import('./CharactersPage'));
const CharacterPage = lazy(() => import('./CharacterPage'));

const backend = process.env.REACT_APP_BACKEND_URL;

interface TablePageParams {
  tableId: string;
}

const TablePage: FC<RouteProps> = () => {
  const classes = useStyles();
  const { tableId } = useParams<TablePageParams>();
  const { path: rawPath, url } = useRouteMatch();
  const path = rawPath === '/' ? '' : rawPath;
  const [tables, setTables] = useLocalState<TableData[]>('tables', []);
  const room = tables.find((r) => r.table === tableId);

  const tableLinks = useMemo(
    () => [
      {
        label: 'Dice',
        url: `${url}`,
        icon: <SvgIcon component={DiceIcons[12]} viewBox="0 0 100 100" />,
      },
      {
        label: 'History',
        url: `${url}/history`,
        icon: <SvgIcon component={HistoryIcon} />,
      },
      {
        label: 'Cards',
        url: `${url}/cards`,
        icon: <SvgIcon component={CardsIcon} viewBox="0 0 100 100" />,
      },
      {
        label: 'Characters',
        url: `${url}/characters`,
        icon: <SvgIcon component={CharactersIcon} />,
      },
      {
        label: 'Leave table',
        url: '/tables',
        icon: <SvgIcon component={ExitIcon} />,
      },
    ],
    [url],
  );

  useSetLinks(room ? tableLinks : localLinks);

  if (!room) {
    return (
      <Div justify="flex-end" align="center" grows>
        <TableUserEditor
          className={classes.root}
          onChange={(name) =>
            setTables((tables) => [...tables, { table: tableId, user: name }])
          }
        />
      </Div>
    );
  }

  return (
    <SocketManager room={room} url={backend}>
      <DiceRemoteHistoryManager room={room} url={backend}>
        <DiceManagerUsingRoute diceThrowerPath={`/table/${room.table}`}>
          <RemoteCharacterManager room={room.table}>
            <Suspense fallback={<LoadingView />}>
              <Switch>
                <Route exact path={`${path}/`} component={DicePage} />
                <Route exact path={`${path}/cards`} component={CardsPage} />
                <Route
                  exact
                  path={`${path}/history`}
                  component={DiceHistoryPage}
                />
                <Route
                  exact
                  path={`${path}/characters`}
                  component={CharactersPage}
                />
                <Route
                  exact
                  path={`${path}/characters/:characterId`}
                  component={CharacterPage}
                />
              </Switch>
            </Suspense>
          </RemoteCharacterManager>
        </DiceManagerUsingRoute>
      </DiceRemoteHistoryManager>
    </SocketManager>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));

export default TablePage;
