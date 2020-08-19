import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { DicePage } from '../pages/DicePage';
import { CardsPage } from '../pages/CardsPage';
import { DiceHistoryPage } from '../pages/DiceHistoryPage';
import { CharactersPage } from '../pages/CharactersPage';
import { CharacterPage } from '../pages/CharacterPage';
import { Layout } from './Layout';
import { TableListPage } from '../pages/TableListPage';
import { DiceLocalHistoryManager } from './DiceLocalHistoryManager';
import { TablePage } from '../pages/TablePage';
import { localLinks } from '../logic/localLinks';

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/table/:tableId" component={TablePage} />
        <Route path="/">
          <Layout links={localLinks}>
            <DiceLocalHistoryManager>
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
            </DiceLocalHistoryManager>
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
