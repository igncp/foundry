import getEmptyStrPropsObj from '../getEmptyStrPropsObj';

describe('getEmptyStrPropsObj', ()=> {
  it('acts as expected', ()=> {
    expect(getEmptyStrPropsObj(['a', 'b',])).to.eql({
      a: '',
      b: '',
    });
  });
});