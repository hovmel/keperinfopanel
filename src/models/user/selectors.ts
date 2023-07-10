import {createSelector} from 'reselect';
import {RootState} from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.user,
);

export const tokenSelector = createSelector(rootSelector, state => state.token);
export const signedInSelector = createSelector(
  rootSelector,
  state => state.signedIn,
);

export const signingInSelector = createSelector(
  rootSelector,
  state => state.signingIn,
);

export const userDataSelector = createSelector(
  rootSelector,
  state => state.userData,
);

export const langSelector = createSelector(rootSelector, state => state.lang);
