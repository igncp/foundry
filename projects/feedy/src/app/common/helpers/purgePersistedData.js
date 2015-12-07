import { purge, } from 'server/helpers/localStorage';

export default (event)=> {
  if (event) event.preventDefault();
  purge();
};