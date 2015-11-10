import 'stores/scoreStore.js';

import 'actions.js';

import GamePanel from './components/GamePanel.jsx';

const Main = ()=> <GamePanel />;

const mainNode = document.getElementById('main');
ReactDOM.render(<Main/>, mainNode);