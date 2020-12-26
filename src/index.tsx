import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Providers } from './components/Providers';
import { UpdateSubscriber } from './logic/updateSubscriber';

const updateSubscriber = new UpdateSubscriber();

ReactDOM.unstable_createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App updateSubscriber={updateSubscriber} />
    </Providers>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({ onUpdate: updateSubscriber.getTrigger() });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
