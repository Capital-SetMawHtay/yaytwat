import {
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import {
  homeActions,
  homeConstants,
  // homeSelectors,
  homeReducer,
  homeSagas,
} from './ducks/home';

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
// */
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* rootSaga() {
  yield takeLatest(homeConstants.USER_DATA_REQUESTED, homeSagas.fetchUserData);
  yield takeLatest(homeConstants.SAVE_REQUESTED, homeSagas.saveUserData);
}

export default rootSaga;