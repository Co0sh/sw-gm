import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { DicePage } from '../pages/DicePage';
import { CardsPage } from '../pages/CardsPage';
import DiceHistoryManager from './DiceHistoryManager';

const App: FC = () => {
  return (
    <Layout>
      <DiceHistoryManager>
        <Switch>
          <Route exact path="/" component={DicePage} />
          <Route exact path="/cards" component={CardsPage} />
        </Switch>
      </DiceHistoryManager>
    </Layout>
  );
};

export default App;
