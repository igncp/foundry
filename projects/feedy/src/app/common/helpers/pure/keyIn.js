// https://github.com/facebook/immutable-js/wiki/Predicates#pick--omit

import { Set } from 'immutable';

export default (keysArr) => {
  const keySet = Set(keysArr);
  return (v, k) => keySet.has(k);
};
