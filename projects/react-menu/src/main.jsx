require('main.scss');

import MenuBar from './menu-bar/menu-bar.jsx';
import MenuTrigger from './menu-trigger/menu-trigger.jsx';
import menuData from './menu-data/menu-data.js'

const Main = React.createClass({
  getInitialState() {
    return {
      showMenu: false,
    };
  },
  render() {
    return (<div>
      <MenuBar
        items={menuData}
        visible={this.state.showMenu}
        onClose={()=> this.setState({showMenu: false})} />
      <MenuTrigger onTrigger={()=> this.setState({showMenu: true})}/>
    </div>);
  }
});

const mainNode = document.getElementById('main');
ReactDOM.render(<Main/>, mainNode);