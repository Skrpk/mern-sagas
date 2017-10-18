import {
  ADD_POST_REQUEST,
  FETCH_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  DELETE_POST_REQUEST,
} from './constants';

export function addPostRequest(post) {
  return {
    type: ADD_POST_REQUEST,
    post,
  };
}

export function fetchPosts() {
  return {
    type: FETCH_POSTS_REQUEST,
  };
}

export function fetchPost(cuid) {
  return {
    type: FETCH_POST_REQUEST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return {
    type: DELETE_POST_REQUEST,
    cuid,
  };
}
