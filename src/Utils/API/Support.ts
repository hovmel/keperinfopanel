import {getSundraxAPI} from './Task';
import {rootApiToken} from '../../Constants/API';
import moment from 'moment';
import {getStates} from './States';

export const sendSupport = async (data): Promise<any> => {
  try {
    const sundraxAPI = await getSundraxAPI();

    await fetch(sundraxAPI + 'Support', {
      method: 'GET',
      headers: {
        'Authorization-Token': rootApiToken,
        'Content-Type': 'application/json',
      },
      data,
    });

    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
};
