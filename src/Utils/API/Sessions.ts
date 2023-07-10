import {rootApiToken, rootApiUrl} from '../../Constants/API';
import {getUser} from '../Storage';

export const loadSessions = async () => {
  const url = rootApiUrl + 'provider';
  const user = await getUser();
  const userJson = JSON.parse(user);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization-Token': rootApiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: 'CIBlockElement',
        method: 'GetList',
        parameters: {
          arOrder: {
            ID: 'DESC',
          },
          arFilter: {
            IBLOCK_CODE: 'session',
            PROPERTY_ID_USER: userJson.token,
          },
          arGroupBy: false,
          arNavStartParams: false,
          GetProperty: [
            'ID',
            'PROPERTY_NAME_DEVICE',
            'PROPERTY_START_SESSION',
            'PROPERTY_STOP_SESSION',
            'PROPERTY_KWAT',
            'PROPERTY_TARIF',
            'PROPERTY_PRICE',
            'PROPERTY_JACKS',
            'PROPERTY_ID_DEVICE',
          ],
        },
      }),
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      console.log('Getting user sessions status is invalid: ', response.status);
      return null;
    }
  } catch (error) {
    console.error('Loading sessions error', error);
  }
};
export const addSession = async (
  sessionStart,
  sessionEnd,
  kilowatts,
  price,
  deviceId,
  jackId,
  deviceName = '',
) => {
  const url = rootApiUrl + 'provider';
  const user = await getUser();
  const userJson = JSON.parse(user);
  console.log('adding session at ', deviceName);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization-Token': rootApiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: 'CIBlockElement',
        method: 'Add',
        parameters: {
          arFields: {
            // TODO was id 51, now 69
            IBLOCK_ID: 69,
            NAME: 'Сессия ' + deviceId + ' Розетка: ' + jackId,
            PROPERTY_VALUES: {
              START_SESSION: sessionStart,
              STOP_SESSION: sessionEnd,
              KWAT: kilowatts,
              PRICE: price,
              JACKS: jackId,
              ID_DEVICE: deviceId,
              ID_USER: userJson.token,
              NAME_DEVICE: deviceName,
            },
          },
        },
      }),
    });
    if (response.status === 200) {
      return true;
    } else {
      console.log('Add session status is invalid: ', response.status);
      return false;
    }
  } catch (error) {
    console.error('Add session error', error);
  }
};
