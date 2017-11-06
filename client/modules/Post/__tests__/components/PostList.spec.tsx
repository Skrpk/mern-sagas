import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import PostList from '../../components/PostList';
const test = require('ava');

Enzyme.configure({ adapter: new Adapter() });

const posts = [
  { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: 'All cats meow "mern!"' },
  { name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: 'All dogs bark "mern!"' },
];

test('renders the list', (t: any) => {
  const wrapper = Enzyme.shallow(
    <PostList posts={posts} handleShowPost={() => {}} handleDeletePost={() => {}} />,
  );

  t.is(wrapper.find('PostListItem').length, 2);
});
