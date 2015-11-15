import foundryCommon from 'common/js/common.js';

import 'stores/scoreStore.js';
import 'actions.js';

import GamePanel from './components/GamePanel.jsx';

foundryCommon.trackAnalytics();

const Main = ()=> <GamePanel />;

const mainNode = document.getElementById('main');
ReactDOM.render(<Main/>, mainNode);