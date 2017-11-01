import callApi, { API_URL } from '../apiCaller';
import nock from 'nock';
const test = require('ava');

test('method defaults to GET', (t: any) => {
  const reply = { foo: 'bar' };
  nock(API_URL)
    .get('/foo')
    .reply(200, reply);
  return callApi('foo').then((response: { foo: string; }) => {
    t.deepEqual(response, reply);
  });
});

test('sends the body', (t: any) => {
  const body = { id: 5 };
  const reply = { foo: 'bar' };
  nock(API_URL)
    .post('/foo', body)
    .reply(200, reply);
  return callApi('foo', 'post', body).then((response: { foo: string; }) => {
    t.deepEqual(response, reply);
  });
});

test('returns the error', (t: any) => {
  const reply = { message: 'Errrrrrrrrr' };
  nock(API_URL)
    .get('/send_error')
    .reply(500, reply);
  return callApi('send_error').then((error: { message: string; }) => {
    t.deepEqual(error, reply);
  });
});
