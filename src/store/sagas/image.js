// @flow

import axios from 'axios';
import HttpsStatus from 'http-status-codes';
import { takeEvery, put } from 'redux-saga/effects';

import { IMAGE, convertImageSucceeded, convertImageFailed } from '../actions/image';
import { generateTable } from '../../utils/GenerateTable';

import Urls from '../../Urls';

function* convertImage(action: Object) {
  const response = yield axios.post(Urls.parse, {
    title: action.imageName,
    image: action.image,
  });

  if (response.status === HttpsStatus.OK) {
    yield put(
      convertImageSucceeded({
        name: action.imageName.substring(0, 30),
        image: action.image,
        date: new Date().toLocaleDateString(),
        sheet: generateTable(response.data),
      }),
    );
  } else {
    yield put(convertImageFailed());
  }
}

function* sheetsSaga(): Object {
  yield takeEvery(IMAGE.CONVERT, convertImage);
}

export default sheetsSaga;
