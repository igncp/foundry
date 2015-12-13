import getRandomInt from 'helpers/getRandomInt';
import routes from 'api/routes';

const latencyMilisecondsInterval = [100, 1200];

const createRequestDispatcher = (method) => {
  return (url, params) => {
    const latency = getRandomInt(...latencyMilisecondsInterval);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = routes.getIn([method, url])(params);

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

export const get = createRequestDispatcher('get');
export const post = createRequestDispatcher('post');
export const put = createRequestDispatcher('put');
