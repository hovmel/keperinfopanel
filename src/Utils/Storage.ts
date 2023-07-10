import AsyncStorage from '@react-native-async-storage/async-storage';

const userTokenKey = 'AuthenticationToken';
const sessionKey = 'LastSession';

export const saveUser = async data => {
  await AsyncStorage.setItem(userTokenKey, data);
  return true;
};

export const getUser = async () => {
  return await AsyncStorage.getItem(userTokenKey);
};

export const saveSession = async data => {
  const savedData = await AsyncStorage.getItem(sessionKey);
  if (!savedData) {
    await AsyncStorage.setItem(sessionKey, JSON.stringify([data]));
    return true;
  }
  let savedArray = JSON.parse(savedData);
  savedArray = await savedArray.filter(item => {
    return !(
      item.switchId === data.switchId && item.deviceId === data.deviceId
    );
  });
  savedArray.push(data);
  await AsyncStorage.setItem(sessionKey, JSON.stringify(savedArray));
  return true;
};

export const getLastSession = async (deviceId, switchId) => {
  let savedData = await AsyncStorage.getItem(sessionKey);
  if (!savedData) {
    return null;
  }
  savedData = await JSON.parse(savedData);
  let sessions = await savedData.filter(
    item => item.deviceId === deviceId && item.switchId === switchId,
  );

  if (sessions && sessions.length > 0) {
    return sessions[0];
  }
  return null;
};
