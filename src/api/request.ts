import axios, {AxiosRequestConfig} from 'axios';
import {call} from 'redux-saga/effects';
import {getSundraxAPI} from '../Utils/API/Task';

export const request = async <T>(
  options: AxiosRequestConfig,
  token?: string | null,
) => {
  const headers = {...options?.headers};
  if (token) {
    headers.Authorization = `Basic ${token}`;
  }
  const baseUrl = await getSundraxAPI();

  console.log(baseUrl);

  console.log('Login', options);
  return axios.request<T>({
    ...options,
    headers,
    baseURL: baseUrl,
  });
};

export interface AuthenticatedRequestParams {
  token: string;
  options: AxiosRequestConfig;
}

export const authenticatedRequestAsync = async <T>({
  options,
  token,
}: AuthenticatedRequestParams) => {
  try {
    // @ts-ignore
    const response: T = await request(options, token);
    return response;
  } catch (error) {
    throw error;
  }
};

export const authenticatedRequest = function* <T>(
  options: AxiosRequestConfig & {token: string},
) {
  //   const token: string | undefined = yield select(tokenSelector);
  try {
    const response: T = yield call(request, options, options.token);
    return response;
  } catch (err: any) {
    throw err;
  }
};

export const externalRequest = <T>(
  externalUrl: string,
  opts: AxiosRequestConfig,
) => axios.request<T>({url: externalUrl, ...opts});
