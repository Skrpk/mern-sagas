const fetch = require('isomorphic-fetch');
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint: string, method: string = 'get', body?: any): any {
  return fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  .then((response: any) => response.json().then((json: any) => ({ json, response })))
  .then(({ json, response }: any) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    (response: any) => response,
    (error: any) => error,
  );
}
