export const setIsMouseEnter = (val, comp) => comp.setData({ isMouseEnter: val });

/**
 * This works only when the component doesn't use `onMouseEnter` or `onMouseLeave`,
 * otherwise just the `setIsMouseEnter` is useful. Usage:
 * <Comp propA="foo" {...mouseOverProps(this)}/>
 */
export default (comp) => {
  const setIsMouseEnterFn = val => () => setIsMouseEnter(val, comp);

  return {
    onMouseEnter: setIsMouseEnterFn(true),
    onMouseLeave: setIsMouseEnterFn(false),
  };
};
