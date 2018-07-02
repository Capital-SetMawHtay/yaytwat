import { createAction } from 'redux-actions';
import * as constants from './constants';

export const initializeState = createAction(constants.INITIALIZE_STATE, (payload) => payload, (payload, meta) => meta);


