import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import type { TypeUser } from '../src/types/Types';

type RetryConfig = {
  sent?: boolean;
} & InternalAxiosRequestConfig;

type TokensRefreshResponse = {
  accessToken: string;
  user: TypeUser; // СДелать типизацию !!!!!!
};

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const prevRequest: RetryConfig | undefined = error?.config;
    if (!prevRequest) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 403 && !prevRequest.sent) {
      const response = await axios<TokensRefreshResponse>('/api/tokens/refresh');
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;