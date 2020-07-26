import React, { FC } from 'react';
import { Layout } from './Layout';
import { DiceHistoryManager } from './DiceHistoryManager';
import { Routes } from './Routes';

const App: FC = () => {
  return (
    <Layout>
      <DiceHistoryManager>
        <Routes />
      </DiceHistoryManager>
    </Layout>
  );
};

export default App;
