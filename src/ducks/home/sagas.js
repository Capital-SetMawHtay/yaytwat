import { call, put } from 'redux-saga/effects';
import * as constants from './constants';
import firebase from '../../firebase';

function* fetchUserData(action) {
  try {
    const ref = call(firebase.database().ref, `users/${action.user.uid}`);
    const snapshot = yield ref.once('value');
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

export default fetchUserData;
