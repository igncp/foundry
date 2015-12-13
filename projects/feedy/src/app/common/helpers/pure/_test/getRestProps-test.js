import { PropTypes } from 'react';

import getRestProps from '../getRestProps';

describe('getRestProps', () => {
  it('acts as expected', () => {
    expect(getRestProps({
      propTypes: {
        children: PropTypes.any,
      },
    }, {
      foo: 'bar',
      children: 'baz',
    })).to.eql({
      foo: 'bar',
    });

    expect(getRestProps({
      constructor: {
        propTypes: {
          children: PropTypes.any,
        },
      },
      props: {
        foo: 'bar',
        children: 'baz',
      },
    })).to.eql({
      foo: 'bar',
    });
  });
});
