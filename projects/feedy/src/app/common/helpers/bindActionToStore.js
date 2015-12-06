import * as appStoreModule from 'store/app';

export default action => appStoreModule.get().dispatch(action);