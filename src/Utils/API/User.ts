import {getUser} from '../Storage';
import {loadDevicesAuthToken, rootApiToken} from '../../Constants/API';
import RNOtpVerify from 'react-native-otp-verify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSundraxAPI, getSundraxAuthorizationHeaders} from './Task';
import blobToBase64 from 'blob-to-base64';
import axios from 'axios';

/*const getOTPHash = async () => {
  try {
    const otpHash = await RNOtpVerify.getHash();
    console.log('OTP hash is ', otpHash);
    return otpHash;
  } catch (error) {
    console.log(error);
    return '';
  }
};*/

/*export const sendVerificationCode = async (code, phone) => {
  const text = `${code}`;
  // format text for Google SMS retriever
  // const otpHash = await getOTPHash();
  // const text = `<#> Ваш код подтверждения: ${code} ${otpHash}`;

  console.log({phone, encoded: encodeURIComponent(text), text});
  const url = `${messagesAPI}&to=${phone}&msg=${encodeURIComponent(
    text,
  )}&json=1`;
  return fetch(url)
    .then(response => response.json())
    .then(json => console.log('sending SMS json is', json));
};*/

export const logIn = async (login: string, password: string) => {
  // http://quloncharge.ru/api/user/token?login=login&password=password
  const sundraxAPI = await getSundraxAPI();
  const url = sundraxAPI + `user/token?login=${login}&password=${password}`;
  console.log({url}, 'from login');

  /*79661403007   202552657*/
  return fetch(url, {
    method: 'GET',
    /*headers: getSundraxAuthorizationHeaders(login, password),*/
    headers: {
      'Authorization-Token': rootApiToken,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    });
};

export const getUserData = async () => {
  const sundraxAPI = await getSundraxAPI();

  const user = await getUser();
  const userJson = JSON.parse(user);
  const url = sundraxAPI + 'user';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization-Token': rootApiToken,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(e => {
      console.log('Error while getting user data', e);
    });
};

export const getFullUserData = async () => {
  const sundraxAPI = await getSundraxAPI();

  const userFromStorage = JSON.parse((await getUser()) || '');
  const url = sundraxAPI + 'User/';
  try {
    const user = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + userFromStorage.token,
        'Content-Type': 'application/json',
      },
    });

    const userJson = await user.json();
    const avatarUrl = url + userJson.Id + '/avatar';

    try {
      const {data} = await axios.get(avatarUrl, {
        headers: {
          Authorization: 'Basic ' + userFromStorage.token,
        },
      });

      const avatar = data
        ? `data:image/jpeg;base64,${data}`
        : 'https://www.freeiconspng.com/uploads/profile-icon-9.png';

      userJson.avatar = avatar;
    } catch (e) {
      console.log('Error while getting user avatar', e);
      userJson.avatar =
        'https://www.freeiconspng.com/uploads/profile-icon-9.png';
    }
    return userJson;
  } catch (e) {
    console.log('Error while getting user full data', e);
  }
};

export const getUserByPhone = async phone => {
  const sundraxAPI = await getSundraxAPI();

  const url = sundraxAPI + 'provider';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization-Token': rootApiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: 'CUser',
        method: 'GetList',
        parameters: {
          order: 'asc',
          by: 'id',
          filter: {
            LOGIN: phone,
          },
        },
      }),
    });
    if (response.status === 200) {
      let json = await response.json();
      console.log('user found:', json);
      if (Array.isArray(json)) {
        return json[0];
      }
      // return user object or false automatically
      return json;
    } else {
      let text = await response.text();
      console.log('load user list failed', text);
    }
  } catch (error) {
    console.error('Loading user list error', error);
  }
};

export const changePassword = async (phone, password) => {
  const sundraxAPI = await getSundraxAPI();

  const user = await getUserByPhone(phone);
  const url = sundraxAPI + 'provider';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization-Token': rootApiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: 'CUser',
        method: 'Update',
        parameters: {
          ID: user.ID,
          fields: {
            PASSWORD: password,
            CONFIRM_PASSWORD: password,
          },
        },
      }),
    });
    if (response.status === 200) {
      let json = await response.json();
      console.log('user change password:', json);
      return json;
    } else {
      let text = await response.text();
      console.log('Changing password failed', text);
    }
  } catch (error) {
    console.error('Change password error', error);
  }
};

export const getUserProfessions = async () => {
  try {
    const sundraxAPI = await getSundraxAPI();
    const authToken = await loadDevicesAuthToken();

    const url = sundraxAPI + 'Catalogs/Professions';

    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        return json;
      });
  } catch (e) {
    console.log(e, 'while getting user professions');
  }
};
