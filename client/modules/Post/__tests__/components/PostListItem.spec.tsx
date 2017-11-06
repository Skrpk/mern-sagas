import * as React from 'react';
import * as sinon from 'sinon';
const test = require('ava');

import PostListItem from '../../components/PostListItem/PostListItem';
import { BrowserRouter } from 'react-router-dom';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';


const post = { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" };
const props = {
  post,
  onDelete: () => {},
  router: { route: {
    location: {},
  },
  },
  onClick: () => {},
};

test('renders properly', (t: any) => {
  const wrapper = shallowWithIntl(
    <PostListItem {...props} />
  );

  t.is(wrapper.find('Link').first().prop('children'), post.title);
  t.regex(wrapper.find('#authorName').first().text(), new RegExp(post.name));
  t.is(wrapper.find('#postDesc').first().text(), post.content);
});

test('has correct props', (t: any) => {
  const wrapper = mountWithIntl(
    <BrowserRouter {...props}>
      <PostListItem {...props} />
    </BrowserRouter>
  );
  t.deepEqual(wrapper.prop('post'), props.post);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', (t: any) => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <PostListItem post={post} onDelete={onDelete} />
  );

  wrapper.find('#postActions > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
