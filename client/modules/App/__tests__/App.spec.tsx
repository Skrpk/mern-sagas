import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as sinon from 'sinon';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
const test = require('ava');

import { App } from '../App';
import { intlShape } from 'react-intl';
import { intl } from '../../../util/react-intl-test-helper';
import { toggleAddPost } from '../AppActions';
import routes from '../../../routes';
import { configureStore } from '../../../store';
const styles = require('../App.css');

Enzyme.configure({ adapter: new Adapter() });

const intlProp = { ...intl, enabledLanguages: ['en', 'fr'] };
const children = <h1>Test</h1>;
const dispatch = sinon.spy();
const route = { routes };
const props = {
  children,
  route,
  dispatch,
  intl: intlProp,
};

test('renders properly', (t: any) => {
  const wrapper = Enzyme.shallow(
    <App {...props} />,
  );
  const instance = wrapper.instance() as App;

  t.is(wrapper.find('Header').length, 1);
  t.is(wrapper.find('Footer').length, 1);
  t.is(wrapper.find('Header').prop('toggleAddPost'), instance.toggleAddPostSection);
  t.truthy(wrapper.find('Header + main').children(), children);
});

test('calls componentDidMount', (t: any) => {
  sinon.spy(App.prototype, 'componentDidMount');
  Enzyme.mount(
    <MemoryRouter>
      <Provider store={configureStore()}>
        <App {...props} />
      </Provider>
    </MemoryRouter>,
    {
      context: {
        router: {
          isActive: sinon.stub().returns(true),
          push: sinon.stub(),
          replace: sinon.stub(),
          go: sinon.stub(),
          goBack: sinon.stub(),
          goForward: sinon.stub(),
          setRouteLeaveHook: sinon.stub(),
          createHref: sinon.stub(),
        },
        intl,
      },
      childContextTypes: {
        router: PropTypes.object,
        intl: intlShape,
      },
    },
  );

  const componentDidMountAny: any = App.prototype.componentDidMount;
  t.truthy(componentDidMountAny.calledTwice);
  componentDidMountAny.restore();
});

test('calling toggleAddPostSection dispatches toggleAddPost', (t: any) => {
  const wrapper = Enzyme.shallow(
    <App {...props} />,
  );
  const instance = wrapper.instance() as App;

  instance.toggleAddPostSection();
  t.truthy(dispatch.calledOnce);
  t.truthy(dispatch.calledWith(toggleAddPost()));
});
