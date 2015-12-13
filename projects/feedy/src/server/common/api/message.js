import { fromJS } from 'immutable';

import ls from 'helpers/localStorage';

export default (initialRoutes) => initialRoutes.mergeIn(['get'], {
  messages: () => {
    return ls.query(['messages']) || fromJS([]);
  },
}).mergeIn(['post'], {
  message: (messageParams) => {
    ls.persistAsList(['messages'], messageParams);

    return messageParams;
  },
});
