/**
 * Main store function
 */
import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import DevTools from './modules/App/components/DevTools';
import rootReducer, { State } from './reducers';
import rootSaga from './sagas';

export function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(sagaMiddleware),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store: Store<{}> = createStore(rootReducer, initialState, compose(...enhancers));

  sagaMiddleware.run(rootSaga);
  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
