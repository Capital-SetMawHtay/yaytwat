import { call, put } from 'redux-saga/effects';
import * as constants from './constants';
import firebase from '../../firebase';

export function* fetchUserData(action) {
  try {
    const ref = firebase.database().ref(`users/${action.user.uid}`);
    const snapshot = yield call([ref, ref.once], 'value');
    console.log('Snapshot', snapshot);
    const data = snapshot.val();
    yield put({
      type: constants.USER_DATA_FETCH_SUCCEEDED,
      data,
    });
  } catch (e) {
    yield put({
      type: constants.USER_DATA_FETCH_FAILED ,
      message: e.message,
    });
  }
}

export function* saveUserData(action) {
  try {
    const ref = firebase.database().ref(`users/${action.user.uid}`);
    const updates = { ...action.data, lastSubmittedAt: new Date() };
    yield call([ref, ref.set], updates);
    yield put({
      type: constants.SAVE_SUCCESSFUL,
      data: updates,
    });
  } catch (e) {
    yield put({
      type: constants.SAVE_FAILED,
      message: e.message,
    });
  }
}
