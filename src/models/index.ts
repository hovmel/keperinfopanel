import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './user';
import markersReducer from './markers';

const createCombinedReducer = () =>
  combineReducers({
    user: userReducer,
    markers: markersReducer,
  });

const createRootReducer = () => {
  const combinedReducer = createCombinedReducer();
  return (state: any, action: any) => {
    return combinedReducer(state, action);
  };
};

export const rootReducer = createRootReducer();

export type RootState = ReturnType<typeof rootReducer>;
