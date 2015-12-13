import R from 'ramda';

import { TABLET_WIDTH, DESKTOP_WIDTH } from 'constants/devices-dimensions';

const w = window;
const d = document;
const e = d.documentElement;
const g = d.getElementsByTagName('body')[0];

let currentWidth = null;

export const updateCurrentWidth = () => {
  currentWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  return currentWidth;
};

const isDeviceOrBigger = (deviceWidth) => currentWidth >= deviceWidth;

export const isTabletOrBigger = R.partial(isDeviceOrBigger, [TABLET_WIDTH]);
export const isDesktopOrBigger = R.partial(isDeviceOrBigger, [DESKTOP_WIDTH]);

export const s = (style) => {
  const { mobile, tablet, desktop } = style;
  let finalStyle = { ...mobile };
  if (isTabletOrBigger()) finalStyle = { ...finalStyle, ...tablet };
  if (isDesktopOrBigger()) finalStyle = { ...finalStyle, ...desktop };

  return finalStyle;
};

updateCurrentWidth();

export default {
  isDesktopOrBigger,
  isTabletOrBigger,
  s,
  updateCurrentWidth,
};
