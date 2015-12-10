import { createHashHistory } from 'history';
import R from 'ramda';

const history = createHashHistory({
  queryKey: false,
});

const getPathnameFromHref = R.memoize((href) => {
  const startPlace = href.indexOf('#') + 1;
  const pathname = href.substr(startPlace, href.length - startPlace);
  return pathname;
});

/**
 * history does not provide a way to get the current path. The only way is by
 * listening to transitions, but that doesn't get the first path. This only works
 * with createHashHistory
 */
history.getPathname = () => {
  const href = window.location.href;
  return getPathnameFromHref(href);
};

export default history;
