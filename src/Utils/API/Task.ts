import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSundraxAuthorizationHeaders = (username, password) => {
  return new Headers({
    Authorization:
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
  });
};

export const getSundraxAPI = async () => {
  let sundraxAPI: string = (await AsyncStorage.getItem("currentServer")) || "";
  //sundraxAPI = `http://kepler.plus/QulonWeb/api/`;
  sundraxAPI = `${sundraxAPI}api/`;

  return sundraxAPI;
};

/*export const getTaskApplications = async () => {
  let headers = getSundraxAuthorizationHeaders();
  headers.append('Content-Type', 'application/json');

  const result = await fetch(sundraxAPI + 'Tasks', {
    method: 'GET',
    headers: headers,
  });
  const json = await result.json();
  return json;
};*/
