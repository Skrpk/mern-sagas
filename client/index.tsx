/**
 * Client entry point
 */
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './App';
import { configureStore } from './store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

hydrate(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App'); // eslint-disable-line global-require
    hydrate(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp,
    );
  });
}
