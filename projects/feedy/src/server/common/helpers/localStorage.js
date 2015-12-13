import Immutable from 'immutable';

const keyInitialPrefix = '@foundryFeedy/';
const keyFinalPrefix = '/foundryFeedy@/';
const version = require('package.json').version;

const getKeyStr = (keysArr) => {
  if (!keysArr || keysArr.length === 0) return null;

  return keyInitialPrefix + version + keyFinalPrefix + keysArr.join('/@feedyKeySeparator/');
};

export const query = (keysArr) => {
  const keysStr = getKeyStr(keysArr);
  const value = window.localStorage.getItem(keysStr);
  const parsedValue = value && JSON.parse(value);

  return parsedValue ? Immutable.fromJS(parsedValue) : value;
};

export const persist = (keysArr, value) => {
  const keysStr = getKeyStr(keysArr);
  const finalValue = Immutable.Iterable.isIterable(value) ?
    value.toJS() : value;

  return window.localStorage.setItem(keysStr, (value !== null) ? JSON.stringify(finalValue) : '');
};

export const persistAsList = (keysArr, newItem, opts={}) => {
  const oldList = query(keysArr);

  if (opts.beforeSave) opts.beforeSave(oldList);

  const newList = (oldList) ? oldList.unshift(newItem) : Immutable.fromJS([newItem]);

  persist(keysArr, newList);
};

const loopFeedyKeys = (cb) => {
  for (let i = window.localStorage.length - 1, key; i >= 0; i--) {
    key = window.localStorage.key(i);
    if (key.slice(0, keyInitialPrefix.length) === keyInitialPrefix) {
      cb(key);
    }
  }
};

export const purge = () => {
  loopFeedyKeys((key) => {
    window.localStorage.removeItem(key);
  });
};

export const getSavedVersionsArrs = () => {
  const versions = [];
  const initVersion = [0, 0, 0];
  const regexp = new RegExp(`${keyInitialPrefix}(.+)${keyFinalPrefix}`);

  loopFeedyKeys((key) => {
    const match = regexp.exec(key);
    if (match) {
      const version = match[1].split('.').map(Number);
      versions.push(version);
    } else versions.push(initVersion);
  });

  return versions;
};

export default {
  query,
  persist,
  persistAsList,
  purge,
};
