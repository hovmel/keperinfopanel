import {getSundraxAPI} from './Task';
import {loadDevicesAuthToken} from '../../Constants/API';

export const getUserFavorites = async () => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const uri = sundraxAPI + 'Objects/Favorites';
  try {
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: authToken,
      },
    });

    return await response.json();
  } catch (error) {
    console.warn('Error while getting user favorites:', error);
  }
};

export const setObjectFavorite = async (ObjectId: string) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const uri = sundraxAPI + 'Objects/Favorites';
  const formData = new FormData();
  formData.append('Id', ObjectId);
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        Authorization: authToken,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.warn('Error while setting object to favorite:', error.message);
  }
};

export const deleteObjectFavorite = async (ObjectId: string) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const uri = sundraxAPI + `Objects/Favorites/${ObjectId}`;
  try {
    await fetch(uri, {
      method: 'DELETE',
      headers: {
        Authorization: authToken,
      },
    });

    console.log('deleted', uri);

    return true;
  } catch (error) {
    console.warn('Error while deleting object to favorite:', error);
  }
};
