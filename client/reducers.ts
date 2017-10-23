/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import AppReducer from './modules/App/AppReducer';
import PostReducer from './modules/Post/PostReducer';
import IntlReducer from './modules/Intl/IntlReducer';
import { Post, App, Intl } from './models';

export interface State {
  app: App;
  posts: Post;
  intl: Intl;
}

// Combine all reducers into one root reducer
export default combineReducers<State>({
  app: AppReducer,
  posts: PostReducer,
  intl: IntlReducer,
});
