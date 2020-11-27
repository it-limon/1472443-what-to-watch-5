import axios from "axios";
import {convertToStandardKeys} from "../utils";

const BACKEND_URL = `https://5.react.pages.academy/wtw`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  PAGE_NOT_FOUND: 404
};

export const createAPI = (onUnauthorized, onPageNotFound) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => {
    onPageNotFound(false);
    response.data = convertToStandardKeys(response.data);
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (!response) {
      onPageNotFound(true);
    }

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    if (response.status === HttpCode.PAGE_NOT_FOUND) {
      onPageNotFound(true);
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
