import { fork } from 'redux-saga/effects';

import image from './image';
import sheets from './sheets';

const sagas = [image, sheets];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
