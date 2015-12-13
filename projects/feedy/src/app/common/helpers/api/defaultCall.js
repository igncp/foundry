import server from 'server/entry';
import toastr from 'toastr/toastr';

export default (callType, query, params) => {
  return server[callType](query, params)
    .then(res => res.data)
    .catch(res => {
      toastr.error(res.error);
    });
};
