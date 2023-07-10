export interface UserInitialState {
  signedIn: boolean;
  token: string;
  signingIn: boolean;
  userData: Object;
  lang: 'en' | 'ru';
  map: 'Yandex' | 'Google';
}

export interface LoginPayload {
  login: string;
  password: string;
  saveUserToCache: boolean;
}

export interface LoginSuccessPayload {
  token: string;
}
