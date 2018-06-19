// @flow

import axios from 'axios';
import HttpsStatus from 'http-status-codes';
import { takeEvery, put } from 'redux-saga/effects';

import { USER, loggedIn, emailAlreadyExists, wrongLoginData } from '../actions/user';

import Urls from '../../Urls';

function* loginSaga(action) {
  const response = yield axios
    .post(Urls.login, {
      email: action.email,
      password: action.password,
    })
    .catch(() => put(wrongLoginData()));

  if (response.status === HttpsStatus.OK) {
    yield put(loggedIn(response.data.name, response.data.email, response.data.id));
  }
}

function* signUpSaga(action) {
  const response = yield axios
    .post(Urls.signup, {
      name: action.name,
      email: action.email,
      password: action.password,
    })
    .catch(() => put(emailAlreadyExists()));

  if (response.status === HttpsStatus.OK) {
    yield put(loggedIn(action.name, action.email, response.data.id));
  }
}

function* sheetsSaga(): Object {
  yield takeEvery(USER.LOGIN, loginSaga);
  yield takeEvery(USER.SIGNUP, signUpSaga);
}

export default sheetsSaga;
