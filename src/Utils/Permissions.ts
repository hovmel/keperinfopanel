import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Местоположение',
        message: 'Разрешите доступ к местоположению',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestSMSReadPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'СМС',
        message: 'Разрешите доступ к сообщениям для автоматического ввода',
        buttonPositive: 'ок',
      },
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Read sms permission granted');
    } else {
      console.log('Read sms permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
