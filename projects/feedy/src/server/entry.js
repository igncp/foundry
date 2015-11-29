/**
 * Simple mock to simulate a backend server, using local storage and
 * a random (low) latency.
 */

import {getRandomInt, } from './helpers/math';

const latencyMilisecondsInterval = [100, 800,];

const createRequestDispatcher = (method)=> {
  return (url, params)=> {
    const latency = getRandomInt(...latencyMilisecondsInterval);

    return new Promise((resolve)=> {
      setTimeout(()=> {
        try {
          const result = requestDispatcher[method][url](params);
          resolve({
            data: result,
            error: false,
          });
        } catch(e) {
          resolve({
            error: e,
          });
        }
      }, latency);
    });
  };
};

const server = {};

server.get = createRequestDispatcher('get');
server.post = createRequestDispatcher('post');
server.put = createRequestDispatcher('put');

export default server;

const requestDispatcher = {
  put: {},
  get: {},
  post: {},
};

requestDispatcher.post['user'] = (params)=> {
  return true;
};