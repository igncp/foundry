import { Map } from 'immutable';

import keyIn from '../keyIn';

describe('keyIn', () => {
  it('acts as expected', () => {
    const fooBarBaz = Map({ foo: 'foo', bar: 'bar', baz: 'baz' });
    const fooBar = Map({ foo: 'foo', bar: 'bar' });
    const result = fooBarBaz.filter(keyIn(['foo', 'bar']));

    expect(result.equals(fooBar)).to.eql(true);
  });
});
