const test = require('ava');
const actionTest = require('redux-ava').actionTest;

import {
  ADD_POST_REQUEST,
  DELETE_POST_REQUEST,
} from '../constants';

import {
  addPostRequest,
  deletePostRequest,
} from '../PostActions';

const post = { name: 'Prashant', title: 'Hello Mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };

test('should return the correct type for addPostRequest', actionTest(
  addPostRequest,
  post,
  { type: ADD_POST_REQUEST, post },
));

test('should return the correct type for deletePostRequest', actionTest(
  deletePostRequest,
  post.cuid,
  { type: DELETE_POST_REQUEST, cuid: post.cuid },
));
