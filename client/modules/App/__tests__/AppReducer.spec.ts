import appReducer, { getShowAddPost } from '../AppReducer';
import { toggleAddPost } from '../AppActions';
const test = require('ava');
const reducerTest = require('redux-ava').reducerTest;

test('action for TOGGLE_ADD_POST is working', reducerTest(
  appReducer,
  { showAddPost: false },
  toggleAddPost(),
  { showAddPost: true },
));

test('getShowAddPost selector', (t: any) => {
  t.is(getShowAddPost({
    app: { showAddPost: false },
  }), false);
});
