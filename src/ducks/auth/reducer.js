/* eslint no-multi-spaces: 0 */
import { handleActions }  from 'redux-actions';
import * as actions       from './actions';
import * as constants from './constants';

// The Initial State
const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SIGN_IN_SUCCESS:
      return action.user;
    case constants.SIGN_OUT:
      return null;
    default:
      return state;
  }
};
