/**
 * Simple mock to simulate a backend server, using local storage 
 * and for the database and a random latency.
 */

import getRandomInt from './helpers/getRandomInt';
import routes from './api/routes';

const latencyMilisecondsInterval = [100, 1200,];

const createRequestDispatcher = (method)=> {
  return (url, params)=> {
    const latency = getRandomInt(...latencyMilisecondsInterval);

    return new Promise((resolve, reject)=> {
      setTimeout(()=> {
        try {
          const result = routes.getIn([method, url,])(params);

          resolve({
            data: result,
            error: false,
          });
        } catch (e) {
          console.warn('feedy server error -> ', e);
          reject({
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
