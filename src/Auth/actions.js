import {
  createAction
} from 'redux-actions';
import * as constants from './constants';

export const signInSuccess = createAction(constants.SIGN_IN_SUCCESS, (payload) => payload, (payload, meta) => meta);
export const signInFail = createAction(constants.SIGN_IN_FAIL, (payload) => payload, (payload, meta) => meta);
