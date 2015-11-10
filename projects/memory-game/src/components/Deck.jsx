import actions from 'actions.js';
import gameStore from 'stores/gameStore.js';

import Card from './Card.jsx';

const styles = getStyles();
console.log("CALLED - 3");
export default React.createClass({
  mixins: [Reflux.listenTo(gameStore,"onGameSettings")],
  componentDidMount: function() {
    actions.getGameSettings();
  },
  onGameSettings(settings) {
    this.setState({
      size: settings.size,
    });
  },
  render() {
    if (this.state) {
      const size = this.state.size;
      const range = R.range(0, size);
      const mapRange = R.pipe(R.flip(R.map)(range), R.flatten);

      return <div>{mapRange((row)=> {
        return <div key={row} style={styles.row}>
          {mapRange((column)=> <Card key={column}/>)}
        </div>;
      })}</div>;
    } else {
      return null;
    }
  }
});

function getStyles() {
  return {
    row: {
      display: 'block'
    }
  };
}