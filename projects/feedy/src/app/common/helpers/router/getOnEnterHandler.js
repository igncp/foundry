import R from 'ramda';

import * as appStoreModule from 'store/app';

export default (opts)=> {
  const hasOpt = R.flip(R.contains)(opts);

  return (nextState, replaceState)=> {
    const appState = appStoreModule.getState();
    const userType = appState.user.get('type');

    if ((hasOpt('onlyAnonym') && userType !== 'anonymous') ||
      (hasOpt('onlyAuth') && userType !== 'auth')) {

      replaceState(null, '/');
    }
  };
};