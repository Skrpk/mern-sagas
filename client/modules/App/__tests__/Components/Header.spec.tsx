import * as React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FormattedMessage } from 'react-intl';
import { Header } from '../../components/Header/Header';
import { intl } from '../../../../util/react-intl-test-helper';
const test = require('ava');

Enzyme.configure({ adapter: new Adapter() });
const intlProp = { ...intl, enabledLanguages: ['en', 'fr'] };

test('renders the header properly', (t: any) => {
  const router = {
    isActive: sinon.stub().returns(true),
  };
  const wrapper = shallow(
    <Header switchLanguage={() => {}} intl={intlProp} toggleAddPost={() => {}} />,
    {
      context: {
        router,
        intl,
      },
    }
  );

  t.truthy(wrapper.find('Link').first().containsMatchingElement(<FormattedMessage id="siteTitle" />));
  t.is(wrapper.find('a').length, 1);
});

test('doesn\'t add post in pages other than home', (t: any) => {
  const router = {
    isActive: sinon.stub().returns(false),
  };
  const wrapper = shallow(
    <Header switchLanguage={() => {}} intl={intlProp} toggleAddPost={() => {}} />,
    {
      context: {
        router,
        intl,
      },
    }
  );

  t.is(wrapper.find('a').length, 0);
});

test('toggleAddPost called properly', (t: any) => {
  const router = {
    isActive: sinon.stub().returns(true),
  };
  const toggleAddPost = sinon.spy();
  const wrapper = shallow(
    <Header switchLanguage={() => {}} intl={intlProp} toggleAddPost={toggleAddPost} />,
    {
      context: {
        router,
        intl,
      },
    }
  );

  wrapper.find('a').first().simulate('click');
  t.truthy(toggleAddPost.calledOnce);
});
