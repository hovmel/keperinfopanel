import {createSelector} from 'reselect';
import {RootState} from '../index';

export const rootSelector = createSelector(
  (state: RootState) => state,
  state => state.markers,
);
export const userSelector = createSelector(
  (state: RootState) => state,
  state => state.user,
);

export const markersToRenderSelector = createSelector(
  rootSelector,
  state => state.markersToLoad,
);

export const nestedObjectsSelector = createSelector(
  rootSelector,
  state => state.nestedObjects,
);

export const allObjectsSelector = createSelector(
  rootSelector,
  state => state.allObjects,
);

export const allMarkersIconsSelector = createSelector(
  rootSelector,
  state => state.allMarkersIcons,
);

export const setActiveObjectSelector = createSelector(
  rootSelector,
  state => state.activeObject,
);

export const mapTypeSelector = createSelector(userSelector, state => state.map);
