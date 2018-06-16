// @flow

// import axios from 'axios';
// import HttpsStatus from 'http-status-codes';
import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { USER, loggedIn } from '../actions/user';

// import Urls from '../../Urls';

function* loginSaga() {
  // TODO: Enable once the API is ready
  // const response = yield axios.get(Urls.history);
  // if (response.status === HttpsStatus.OK) {
  //   yield put(loggedIn('Muhammad Tarek', 'muhammad.test@test.com', '4324'));
  // }

  yield delay(500, true);
  yield put(loggedIn('Muhammad Tarek', 'muhammad.test@test.com', '4324'));
}

function* signUpSaga() {
  // TODO: Enable once the API is ready
  // const response = yield axios.get(Urls.history);
  // if (response.status === HttpsStatus.OK) {
  //   yield put(loggedIn('Muhammad Tarek', 'muhammad.test@test.com', '4324'));
  // }
  yield delay(500, true);
  yield put(loggedIn('Muhammad Tarek', 'muhammad.test@test.com', '4324'));
}

function* sheetsSaga(): Object {
  yield takeEvery(USER.LOGIN, loginSaga);
  yield takeEvery(USER.SIGNUP, signUpSaga);
}

export default sheetsSaga;
