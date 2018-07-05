/* eslint no-multi-spaces: 0 */
import { handleActions }  from 'redux-actions';
import * as actions       from './actions';
import * as constants from './constants';

// The Initial State
const initialState = {
  user: null,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_DATA_FETCH_SUCCEEDED:
      return { ...state, data: action.data };  
    default:
      return state;
  }
};
