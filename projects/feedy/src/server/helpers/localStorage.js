import Immutable from 'immutable';

const keyPrefix = '@foundryFeedy';

const getKeyStr = (keysArr)=> {
  if (!keysArr || keysArr.length === 0) return null;

  return keyPrefix + keysArr.join('/@feedyKeySeparator/');
};

export const query = (keysArr)=> {
  const keysStr = getKeyStr(keysArr);
  const value = window.localStorage.getItem(keysStr);
  const parsedValue = value && JSON.parse(value);

  return parsedValue ? Immutable.fromJS(parsedValue) : value;
};

export const persist = (keysArr, value)=> {
  const keysStr = getKeyStr(keysArr);
  const finalValue = Immutable.Iterable.isIterable(value) ?
    value.toJS() : value;

  return window.localStorage.setItem(keysStr, (value !== null) ? JSON.stringify(finalValue) : '');
};

export const purge = ()=> {
  for (let i = 0, key; i < window.localStorage.length; i++) {
    key = window.localStorage.key(i);
    if (key.slice(0, keyPrefix.length) === keyPrefix) {
      window.localStorage.removeItem(key);
    }
  }
};

export default {
  query,
  persist,
  purge,
};
