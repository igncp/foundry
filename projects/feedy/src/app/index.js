import { render, } from 'react-dom';
import * as appStore from 'store/app';
import Router from 'components/Router';

appStore.create();

module.exports = ()=> {
  render(<Router/>, document.getElementById('main'));
};
