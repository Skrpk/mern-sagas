import {
  ADD_POST,
  ADD_POSTS,
  DELETE_POST,
  ADD_POST_REQUEST,
  FETCH_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  DELETE_POST_REQUEST,
} from './constants';

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

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
