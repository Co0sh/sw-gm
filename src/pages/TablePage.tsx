import React, { FC } from 'react';
import SvgIcon from '@material-ui/icons/People';
import {
  Route,
  Switch,
  useRouteMatch,
  RouteProps,
  useParams,
} from 'react-router';
import { DicePage } from './DicePage';
import { CardsPage } from './CardsPage';
import { DiceHistoryPage } from './DiceHistoryPage';
import { CharactersPage } from './CharactersPage';
import { CharacterPage } from './CharacterPage';
import CharactersIcon from '@material-ui/icons/Accessibility';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { DiceIcons } from '../logic/diceIcons';
import { ReactComponent as CardsIcon } from '../assets/cards.svg';
import { TableData } from '../logic/tableData';
import { Layout } from '../components/Layout';
import { SocketManager } from '../components/SocketManager';
import { DiceRemoteHistoryManager } from '../components/DiceRemoteHistoryManager';
import { useLocalState } from '../logic/useLocalState';
import { localLinks } from '../logic/localLinks';
import { TableUserEditor } from '../components/TableUserEditor';
import { Div } from '../components/Div';
import { makeStyles } from '@material-ui/core';

const backend = process.env.REACT_APP_BACKEND_URL;

interface TablePageParams {
  tableId: string;
}

export const TablePage: FC<RouteProps> = () => {
  const classes = useStyles();
  const { tableId } = useParams<TablePageParams>();
  const { path: rawPath, url } = useRouteMatch();
  const path = rawPath === '/' ? '' : rawPath;
  const [tables, setTables] = useLocalState<TableData[]>('tables', []);
  const room = tables.find((r) => r.table === tableId);

  if (!room) {
    return (
      <Layout links={localLinks}>
        <Div justify="flex-end" align="center" grows>
          <TableUserEditor
            className={classes.root}
            onChange={(name) =>
              setTables((tables) => [...tables, { table: tableId, user: name }])
            }
          />
        </Div>
      </Layout>
    );
  }

  return (
    <Layout
      links={[
        {
          label: 'Dice',
          url: `${url}`,
          icon: <SvgIcon component={DiceIcons[12]} viewBox="0 0 100 100" />,
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
      ]}
    >
      <SocketManager room={room} url={backend}>
        <DiceRemoteHistoryManager room={room} url={backend}>
          <Switch>
            <Route exact path={`${path}/`} component={DicePage} />
            <Route exact path={`${path}/cards`} component={CardsPage} />
            <Route exact path={`${path}/history`} component={DiceHistoryPage} />
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
        </DiceRemoteHistoryManager>
      </SocketManager>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    width: '100%',
    padding: theme.spacing(2),
  },
}));
