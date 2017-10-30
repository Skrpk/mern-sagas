import { ADD_POST, ADD_POSTS, DELETE_POST } from './constants';
import { PostReducerInit } from './PostModel';
// Initial State
const createInitialState = (): PostReducerInit => ({
  data: [],
});

const PostReducer = (
  state = createInitialState(),
  action: {
    type: string;
    post?: PostReducerInit;
    posts?: PostReducerInit[],
    cuid?: string;
  }) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = (state: any) => state.posts.data;

// Get post by cuid
export const getPost = (state: any, cuid: string) =>
                      state.posts.data.filter((post: any) => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
