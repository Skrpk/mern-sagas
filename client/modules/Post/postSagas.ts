import { takeEvery, call, put, all, fork } from 'redux-saga/effects';

import apiCaller from '../../util/apiCaller';
import {
  addPost,
  addPosts,
  deletePost,
} from './PostActions';

import {
  ADD_POST_REQUEST,
  FETCH_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  DELETE_POST_REQUEST,
} from './constants';

function* addPostRequest({ post }) {
  try {
    const receivedData: object = yield call(apiCaller, 'posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    });

    yield put(addPost(receivedData.post));
  } catch (e) {
    throw e;
  }
}

function* fetchPostsRequest() {
  try {
    const data: object = yield call(apiCaller, 'posts');

    yield put(addPosts(data.posts));
  } catch (e) {
    throw e;
  }
}

function* fetchPostRequest({ cuid }) {
  try {
    const post: object = yield call(apiCaller, `posts/${cuid}`);

    yield put(addPost(post));
  } catch (e) {
    throw e;
  }
}

function* deletePostRequest({ cuid }) {
  try {
    yield call(apiCaller, `posts/${cuid}`, 'delete');
    yield put(deletePost(cuid));
  } catch (e) {
    throw e;
  }
}

function* addPostSaga() {
  yield takeEvery(ADD_POST_REQUEST, addPostRequest);
}

function* fetchPostsSaga() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPostsRequest);
}

function* fetchPostSaga() {
  yield takeEvery(FETCH_POST_REQUEST, fetchPostRequest);
}

function* deletePostSaga() {
  yield takeEvery(DELETE_POST_REQUEST, deletePostRequest);
}

export default function* rootPostSaga() {
  yield all([
    fork(addPostSaga),
    fork(fetchPostsSaga),
    fork(fetchPostSaga),
    fork(deletePostSaga),
  ]);
}
