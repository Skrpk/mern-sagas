/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import * as React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const { mount, shallow } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });
// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = require('../../Intl/localizationData/en');

// Create the IntlProvider to retrieve context for wrapping around.
// tslint:disable-next-line
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
export const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
const nodeWithIntlProp = (node: any) => {
  return React.cloneElement(node, { intl });
};

export const shallowWithIntl = (node: object) => {
  return shallow(nodeWithIntlProp(node), { context: { intl } });
};

export const mountWithIntl = (node: object) => {
  return mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape },
  });
};
