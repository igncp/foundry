/**
 * Simple mock to simulate a backend server, using local storage
 * and for the database and a random latency for ajax calls (get, post, put) and
 * no latency for mocked cookies.
 */

import {get, post, put, } from './helpers/ajax';
import cookies from './helpers/cookies';

const server = {get, post, put, cookies, };

export default server;
