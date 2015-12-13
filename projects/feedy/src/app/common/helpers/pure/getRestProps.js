import { omit, keys } from 'ramda';

const getArgsUnary = (args) => {
  const comp = args[0];
  const propTypes = comp.constructor.propTypes;
  const props = comp.props;

  return [propTypes, props];
};

const getArgsBinary = (args) => {
  const Comp = args[0];
  const propTypes = Comp.propTypes;
  const props = args[1];

  return [propTypes, props];
};

/**
 * This function is unary or binary depending on where it is used:
 *   - 1 argument (inside a class' render): this
 *   - 2 arguments (inside a stateless component): Comp, props
 */
export default (...args) => {
  const [propTypes, props] = (args.length === 1) ? getArgsUnary(args) : getArgsBinary(args);

  return omit(keys(propTypes), props);
};
