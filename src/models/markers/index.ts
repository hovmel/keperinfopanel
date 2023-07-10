import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AllObjectsFromStaticData from '../../Constants/allObjectsOfSundrax.json';

const initialState = {
  nestedObjects: [],
  markersToLoad: [],
  allMarkersIcons: [],
  allObjects: AllObjectsFromStaticData,
  activeObject: {},
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    setMarkersToLoad: (state, {payload: markersToLoad}: PayloadAction<any>) => {
      console.log('setting markers to load');
      state.markersToLoad = markersToLoad;
    },
    setNestedObjects: (state, {payload: nestedObjects}: PayloadAction<any>) => {
      console.log('setting nested objects');
      state.nestedObjects = nestedObjects;
    },
    setAllMarkersIcons: (
      state,
      {payload: allMarkersIcons}: PayloadAction<any>,
    ) => {
      console.log('setting all markers icons');
      state.allMarkersIcons = allMarkersIcons;
    },
    setAllObjects: (state, {payload: allObjects}: PayloadAction<any>) => {
      console.log('setting all objects');
      state.allObjects = allObjects;
    },
    setActiveObject: (state, {payload}) => {
      console.log('Setting active object in reducer', payload);
      state.activeObject = payload;
    },
    /*login(state, {payload}: PayloadAction<LoginPayload>) {
      state.signingIn = true;
    },
    loginSuccess: (state, {payload}: PayloadAction<LoginSuccessPayload>) => {
      state.signedIn = true;
      state.signingIn = false;

      state.token = payload.token;
    },
    loginError(state) {
      state.signingIn = false;
    },
    logout(state) {
      state.signedIn = false;
      state.userData = {};
    },
    setUserData: (state, {payload}) => {
      state.userData = payload;
    },*/
  },
});

export const markerActions = markersSlice.actions;

export default markersSlice.reducer;
