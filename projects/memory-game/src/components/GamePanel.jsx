import actions from 'actions.js';

import gameStore from 'stores/gameStore.js';

import ScorePanel from './ScorePanel.jsx';
import Deck from './Deck.jsx';

const styles = getStyles();

export default React.createClass({
  mixins: [Reflux.listenTo(gameStore,"onGame")],
  propTypes: {
    size: React.PropTypes.number,
  },
  onGame(gameData) {
    this.setState({
      size: gameData.size,
    });
  },
  componentWillMount: function() {
    const settings = gameStore.getGameSettings();
    
    this.setState({
      size: settings.size,
    });
  },
  render() {
    return (<div>
      <p style={styles.title}>Still under construction</p>
      <ScorePanel />
      <Deck size={this.state.size}/>
    </div>);
  }
});

function getStyles() {
  return {
    title: {
      margin: 30,
      fontSize: 30,
    },
  }
}