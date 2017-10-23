import { ADD_POST, ADD_POSTS, DELETE_POST } from './constants';
import { Post } from './model';
// Initial State
const createInitialState = (): Post => ({
  data: [],
});

const PostReducer = (state = createInitialState(), action) => {
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
export const getPosts = (state: object) => state.posts.data;

// Get post by cuid
export const getPost = (state: object, cuid: string) =>
                      state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
