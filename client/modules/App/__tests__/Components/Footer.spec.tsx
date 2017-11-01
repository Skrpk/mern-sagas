import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Footer } from '../../components/Footer/Footer';
const test = require('ava');

Enzyme.configure({ adapter: new Adapter() });

test('renders the footer properly', (t: any) => {
  const wrapper = shallow(
    <Footer />
  );

  t.is(wrapper.find('p').length, 2);
  t.is(wrapper.find('p').first().text(), '© 2016 · Hashnode · LinearBytes Inc.');
});
