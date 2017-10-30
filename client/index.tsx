/**
 * Client entry point
 */
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './App';
import { configureStore } from './store';

declare global {
    interface Window {
      __INITIAL_STATE__: any;
      devToolsExtension: any;
    }
}

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
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
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp,
    );
  });
}
