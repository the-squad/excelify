// @flow

import axios from 'axios';
import HttpsStatus from 'http-status-codes';
import { takeEvery, put } from 'redux-saga/effects';

import { SHEETS, loadSheetsSucceeded } from '../actions/sheets';

import Urls from '../../Urls';

function* loadSheets() {
  const response = axios.get(Urls.history);

  if (response.status === HttpsStatus.OK) {
    yield put(loadSheetsSucceeded(response.data));
  }
}

function* sheetsSaga(): Object {
  yield takeEvery(SHEETS.LOAD, loadSheets);
}

export default sheetsSaga;
