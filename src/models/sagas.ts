import {all} from 'redux-saga/effects';

import userSagas from './user/sagas';

export const rootSaga = function* rootSaga() {
  yield all([userSagas()]);
};
