import R from 'ramda';

// emptyStrProps(['foo', 'bar']) => {foo: '', bar: ''}
export default (arr) => {
  const obj = {};
  R.forEach(prop => obj[prop] = '')(arr);
  return obj;
};
