import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { Intl } from './IntlModel';
import { State } from '../../reducers';

interface Props {
  children: object;
  intl: Intl;
}

export const IntlWrapper: React.SFC<Props> = props => (
  <IntlProvider { ...props.intl } >
    { props.children }
  </IntlProvider>
);

// Retrieve data from store as props
function mapStateToProps(store: State) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(IntlWrapper);
