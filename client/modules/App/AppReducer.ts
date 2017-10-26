// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';
import { App } from './AppModel';

// Initial State
const createInitialState = (): App => ({
  showAddPost: false,
});

const AppReducer = (state = createInitialState(), action: { type: string }) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = (state: any): boolean => state.app.showAddPost;

// Export Reducer
export default AppReducer;
