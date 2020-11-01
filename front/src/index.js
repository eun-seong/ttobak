import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux';
import configureStore from 'Sessions/configureStore.js';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const store = configureStore();
Sentry.init({
  dsn: "https://2a2d7a9ded0a453a8b09b4d63ef4216d@o469646.ingest.sentry.io/5499442",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

