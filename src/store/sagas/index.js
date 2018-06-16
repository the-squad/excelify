import { fork } from 'redux-saga/effects';

import image from './image';
import sheets from './sheets';
import user from './user';

const sagas = [image, sheets, user];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
