import * as React from 'react';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { PostCreateWidget } from '../../components/PostCreateWidget/PostCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';
const test = require('ava');

const props = {
  addPost: () => {},
  showAddPost: true,
  intl: {},
};

test('renders properly', (t: any) => {
  const wrapper = shallowWithIntl(
    <PostCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewPost" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddPost is false', (t: any) => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  wrapper.setProps({ showAddPost: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', (t: any) => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.prop('addPost'), props.addPost);
  t.is(wrapper.prop('showAddPost'), props.showAddPost);
});

test('calls addPost', (t: any) => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} showAddPost intl={{}} />
  );

  wrapper.ref('name').value = 'David';
  wrapper.ref('title').value = 'Some Title';
  wrapper.ref('content').value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('David', 'Some Title', 'Bla Bla Bla'));
});

test('empty form doesn\'t call addPost', (t: any) => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} showAddPost intl={{}} />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addPost.called);
});
