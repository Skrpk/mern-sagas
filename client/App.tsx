/**
 * Root Component
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import IntlWrapper from './modules/Intl/IntlWrapper';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');

interface Props {
  store: any;
}

export const App: React.SFC<Props> = (props) => {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </IntlWrapper>
    </Provider>
  );
};
