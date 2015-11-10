import actions from 'actions.js';

import ScorePanel from './ScorePanel.jsx';
import Deck from './Deck.jsx';

export default React.createClass({
  render() {
    return (<div>
      <ScorePanel />
      <Deck />
    </div>);
  }
});
