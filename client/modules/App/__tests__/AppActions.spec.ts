import { TOGGLE_ADD_POST, toggleAddPost } from '../AppActions';
const test = require('ava');
const actionTest = require('redux-ava').actionTest;

test('should return the correct type for toggleAddPost', actionTest(toggleAddPost, null, { type: TOGGLE_ADD_POST }));
