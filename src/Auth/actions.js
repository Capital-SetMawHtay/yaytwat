import {
  createAction
} from 'redux-actions';
import * as constants from './constants';

export const signInSuccess = createAction(constants.SIGN_IN_SUCCESS, (user) => ({ user }));
export const signInFail = createAction(constants.SIGN_IN_FAIL, () => ({}));
