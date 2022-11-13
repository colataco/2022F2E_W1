import axios, { AxiosError, AxiosResponse } from 'axios';

const isAxiosError = (error: any) => error.isAxiosError;

const api = axios.create({
  baseURL: process.env.REACT_APP_IP,
  timeout: 60000,
});

api.interceptors.request.use((Request: any) => {
  localStorage.getItem('token') &&
    (Request.headers.Authorization = localStorage.getItem('token'));
  return Request;
});

api.interceptors.response.use(
  (Response) => Promise.resolve(Response),
  (error: Error | AxiosError) => {
    let response: AxiosResponse = {
      data: { errorMsg: 'API_ERROR.SYSTEM_ERROR' },
      status: 500,
      statusText: '',
      headers: {},
      config: {},
    };
    if (isAxiosError(error)) {
      const err = error as AxiosError;
      response = { ...response, ...err.response };
    }
    switch (response.status) {
      case 400:
        console.log('400');
        break;
      case 401:
      case 403:
        // logout
        localStorage.removeItem('token');
        // window.location.href = PATH.LOGIN;
        break;
      case 404:
        console.log('404');
        break;
      case 412:
        break;
      case 500:
        break;
      default:
        break;
    }
    return Promise.reject(response);
  }
);

// {a:1,b:2, c:[1, 2,3]}
// a=1&b=2&c=1,2,3
/**
 * 替換物件成queryString，例如{a:1,b:2, c:[1, 2,3]} 轉換成 a=1&b=2&c=1,2,3
 * @param {Object} paramsObject Query obj
 */
export function toQueryString(
  paramsObject: {
    [key: string]: any;
  } = {}
) {
  if (!paramsObject) {
    return '';
  }

  return Object.keys(paramsObject)
    .filter(
      (key: string) =>
        paramsObject[key] !== '' &&
        paramsObject[key] !== null &&
        typeof paramsObject[key] !== 'undefined'
    )
    .map((key: string) =>
      Array.isArray(paramsObject[key])
        ? // convert to key=val1,val2,val3 string
          `${key}=${paramsObject[key]
            .map((val: string | number) => `${encodeURIComponent(val)}`)
            .join(',')}`
        : // convert to key=val string
          `${key}=${encodeURIComponent(paramsObject[key])}`
    )
    .join('&');
}

/**
 * 替換Url中的變數，例如/v1/api/user/{id} 轉換成 /v1/api/user/5
 * @param {String} url API Url
 * @param {Object} body Query Parameters
 */
export function replaceUrl(url: string, body: { [key: string]: any }) {
  const regex = /(\{.+?\})/gi;
  return url.replace(regex, (v) => {
    const replacable = v[0] === '{';

    if (!replacable) {
      return v;
    }

    const propName = v.slice(1, -1);
    const replacedValue = body[propName];

    // eslint-disable-next-line no-param-reassign
    body[propName] = undefined;

    return replacedValue;
  });
}
