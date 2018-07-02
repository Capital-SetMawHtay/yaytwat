/* eslint no-multi-spaces: 0 */
import { handleActions } from 'redux-actions';
import * as actions from './actions';

// The Initial State
const initialState = {
  user: null,
};

export default handleActions({
  // Initialize State
  [actions.signInSuccess]: (state, {user}) => ({ ...state, user }),
}, initialState);