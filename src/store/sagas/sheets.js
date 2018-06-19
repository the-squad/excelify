// @flow

import axios from 'axios';
import Cookies from 'js-cookie';
import HttpsStatus from 'http-status-codes';
import { takeEvery, put } from 'redux-saga/effects';

import { USER } from '../actions/user';
import { loadSheetsSucceeded } from '../actions/sheets';

import Urls from '../../Urls';

function* loadSheets() {
  const token = Cookies.get('GP_TOKEN');
  const response = yield axios.get(`${Urls.history}/${token}`);
  console.log(response);

  if (response.status === HttpsStatus.OK) {
    yield put(loadSheetsSucceeded(response.data.data));
  }
}

function* sheetsSaga(): Object {
  yield takeEvery(USER.LOGGED_IN, loadSheets);
  yield takeEvery(USER.LOAD, loadSheets);
}

export default sheetsSaga;
