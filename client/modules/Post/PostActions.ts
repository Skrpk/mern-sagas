import {
  ADD_POST,
  ADD_POSTS,
  DELETE_POST,
  ADD_POST_REQUEST,
  FETCH_POST_REQUEST,
  FETCH_POSTS_REQUEST,
  DELETE_POST_REQUEST,
} from './constants';

import { PostReducerInit, Post } from './PostModel';

export function addPost(post: Post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPosts(posts: PostReducerInit[]) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function deletePost(cuid: string) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function addPostRequest(post: { name: string, title: string, content: string }) {
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

export function fetchPost(cuid: string) {
  return {
    type: FETCH_POST_REQUEST,
    cuid,
  };
}

export function deletePostRequest(cuid: string) {
  return {
    type: DELETE_POST_REQUEST,
    cuid,
  };
}
