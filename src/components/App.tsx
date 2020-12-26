import React, { FC } from 'react';
import { UpdateSubscriber } from '../logic/updateSubscriber';
import { Routes } from './Routes';
import UpdateNotification from './UpdateNotification';

interface AppProps {
  updateSubscriber: UpdateSubscriber;
}

const App: FC<AppProps> = ({ updateSubscriber }) => {
  return (
    <>
      <Routes />
      <UpdateNotification updateSubscriber={updateSubscriber} />
    </>
  );
};

export default App;
