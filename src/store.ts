import {configureStore} from '@reduxjs/toolkit';
import createDebugger from 'redux-flipper';
import createSagaMiddleware from '@redux-saga/core';
import {rootReducer} from './models';
import {rootSaga} from './models/sagas';

export const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
    createDebugger(),
  ],
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

export default store;
