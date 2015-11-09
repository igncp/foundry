require('main.scss');

import foundryCommon from './common/js/common.js';

import MenuBar from './menu/bar/menu-bar.jsx';
import MenuTrigger from './menu/trigger/menu-trigger.jsx';
import Loader from './loader/loader.jsx';

const Main = React.createClass({
  getInitialState() {
    return {
      showMenu: false,
    };
  },
  getMenuList() {
    return [{
      name: 'index',
      action: ()=> foundryCommon.goToIndex(),
    }, {
      name: 'load',
      action: ()=> {
        this.setState({isLoading: true});

        setTimeout((()=> this.setState({isLoading: false})), 1000)
      },
    },];
  },
  render() {
    return (<div>
      <MenuBar
        items={this.getMenuList()}
        visible={this.state.showMenu}
        onClose={()=> this.setState({showMenu: false})} />
      <MenuTrigger onTrigger={()=> this.setState({showMenu: true})}/>
      <Loader isActive={this.state.isLoading}/>
    </div>);
  }
});

const mainNode = document.getElementById('main');
ReactDOM.render(<Main/>, mainNode);