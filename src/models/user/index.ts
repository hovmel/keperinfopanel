import {LoginPayload, LoginSuccessPayload} from './types';
/* eslint-disable @typescript-eslint/no-unused-vars */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInitialState} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: UserInitialState = {
  signedIn: false,
  signingIn: false,
  token: '',
  userData: {},
  lang: 'en',
  map: 'Yandex',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, {payload}: PayloadAction<LoginPayload>) {
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
    },
    setLang: (state, {payload}) => {
      AsyncStorage.setItem('lang', payload).then(() =>
        console.log('Saved lang to storage:', payload),
      );
      state.lang = payload;
    },
    setMap: (state, {payload}) => {
      AsyncStorage.setItem('map', payload).then(() =>
        console.log('Saved map to storage:', payload),
      );
      state.map = payload || 'Yandex';
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
