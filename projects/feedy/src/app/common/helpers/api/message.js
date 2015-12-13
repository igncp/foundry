import defaultCall from './defaultCall';

export const getMessages = (params={}) => defaultCall('get', 'messages', params);

export const saveMessage = (message) => defaultCall('post', 'message', message);
