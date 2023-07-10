import {rootApiToken, rootApiUrl} from '../../Constants/API';
import {getUserData} from './User';

export const sendApplication = async text => {
  const url = rootApiUrl + 'provider';
  const userData = await getUserData();
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
            IBLOCK_ID: 11,
            PROPERTY_VALUES: {
              PROPERTY_NAME: userData.NAME,
              PROPERTY_PHONE: userData.PERSONAL_PHONE,
              PROPERTY_EMAIL: 'null@mail.ru',
              PROPERTY_MESSAGE: text,
            },
          },
        },
      }),
    });
    if (response.status === 200) {
      return true;
    } else {
      console.log('Application sent form status: ', response.status);
      return false;
    }
  } catch (error) {
    console.error('Application sent error', error);
    return false;
  }
};
