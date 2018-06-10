import { fork } from 'redux-saga/effects';

const sagas = [];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
