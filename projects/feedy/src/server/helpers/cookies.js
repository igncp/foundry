import ls from './localStorage';

const getCookieKey = key=> ['cookie/' + key, ];

export default {
  get: key => ls.query(getCookieKey(key)),
  set: (key, value) => ls.persist(getCookieKey(key), value),
};
