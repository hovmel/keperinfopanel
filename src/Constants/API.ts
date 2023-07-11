import AsyncStorage from "@react-native-async-storage/async-storage";

export const rootApiUrl = "https://quloncharge.ru/api/";
export const rootApiToken = "3ac582b0-1de43f9a-b97de8fe-abcb72cd";
export const messagesAPI =
  "https://sms.ru/sms/send?api_id=C9173232-9A56-2C55-6DB3-C4D4CA3EB7A2";

//export const loadDevicesAuthToken = 'Basic cm96ZXRrYTpyb3pldGthMTIz';
export const loadDevicesAuthToken = async () => {
  //console.log('getting token');
  const token = await AsyncStorage.getItem("token");
  return "Basic " + token;
};

export const yaMapAPIKey = "c94acde6-4b9a-4b9f-a3a9-0af95ad5b0ea";
export const geocoderAPIKey = "6914d4c4-0680-4784-984d-07562aa10535";

export const JackStatuses = {
  ON: "1",
  OFF: "0",
};

export const jackTariff = 6;
