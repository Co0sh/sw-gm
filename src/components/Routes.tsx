import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { TableListPage } from '../pages/TableListPage';
import { DiceLocalHistoryManager } from './DiceLocalHistoryManager';
import { TablePage } from '../pages/TablePage';
import { localLinks } from '../logic/localLinks';
import LoadingView from './LoadingView';

const DicePage = lazy(() => import('../pages/DicePage'));
const CardsPage = lazy(() => import('../pages/CardsPage'));
const DiceHistoryPage = lazy(() => import('../pages/DiceHistoryPage'));
const CharactersPage = lazy(() => import('../pages/CharactersPage'));
const CharacterPage = lazy(() => import('../pages/CharacterPage'));

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/table/:tableId" component={TablePage} />
        <Route path="/">
          <Layout links={localLinks}>
            <DiceLocalHistoryManager>
              <Suspense fallback={<LoadingView />}>
                <Switch>
                  <Route exact path="/" component={DicePage} />
                  <Route exact path="/cards" component={CardsPage} />
                  <Route exact path="/history" component={DiceHistoryPage} />
                  <Route exact path="/characters" component={CharactersPage} />
                  <Route
                    exact
                    path="/characters/:characterId"
                    component={CharacterPage}
                  />
                  <Route exact path="/tables" component={TableListPage} />
                </Switch>
              </Suspense>
            </DiceLocalHistoryManager>
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
