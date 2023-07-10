import {LoginPayload} from './types';
import {PayloadAction} from '@reduxjs/toolkit';
import {takeLatest, put, call} from 'redux-saga/effects';
import {userActions} from '.';
import {authenticatedRequest} from '../../api/request';
import {Buffer} from 'buffer';
import {saveUser} from '../../Utils/Storage';
import {Alert} from 'react-native';
import {t, translate} from '../../Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* loginSaga({payload}: PayloadAction<LoginPayload>) {
  try {
    const token = Buffer.from(`${payload.login}:${payload.password}`).toString(
      'base64',
    );

    yield authenticatedRequest({
      url: '/User',
      token,
    });

    const userData = JSON.stringify({
      login: payload.login,
      password: payload.password,
      token,
    });

    yield AsyncStorage.setItem('token', token);

    if (payload.saveUserToCache) {
      yield call(saveUser, userData);
    }
    yield put(
      userActions.loginSuccess({
        token,
      }),
    );
  } catch (error: any) {
    console.log('error', error);
    let errorTextName = '';
    const lang = yield AsyncStorage.getItem('lang');
    if (error?.response?.status === 401) {
      errorTextName = t('Check login/password', lang);
    } else {
      errorTextName = t('Check Server address', lang);
    }
    Alert.alert(t('error', lang), errorTextName);
    yield put(userActions.loginError());
  }
}

export default function* () {
  yield takeLatest(userActions.login.type, loginSaga);
}
