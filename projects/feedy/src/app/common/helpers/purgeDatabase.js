import { purge, } from 'server/helpers/database';

export default (event)=> {
  if (event) event.preventDefault();
  purge();
};