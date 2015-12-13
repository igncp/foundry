/**
 * Simple mock to simulate a backend server, using local storage,
 * a random latency for ajax calls (get, post, put) and
 * no latency for mocked cookies.
 * The checkVersion function allows to purge data if it was from
 * a previous significant version (first or sercond number).
 */

import { get, post, put } from './ajax';
import cookies from './cookies';
import getDataSavedVersion from './getDataSavedVersion';

const server = {
  get,
  post,
  put,
  getDataSavedVersion,
  cookies,
};

export default server;
