import actions from 'actions.js';

import deckStore from 'stores/deckStore.js';

import Card from './Card.jsx';

const styles = getStyles();
const mapSizeFn = size => R.flip(R.map)(R.range(0, size));

export default React.createClass({
  mixins: [Reflux.listenTo(deckStore,"onDeck")],
  propTypes: {
    size: React.PropTypes.number,
  },
  componentDidMount: function() {
    const cardsNumber = Math.pow(this.props.size, 2);

    actions.generateDeck(cardsNumber);
  },
  onDeck(deckData) {
    this.setState({
      isVisible: true,
      deck: deckData.deck,
    });
  },
  render() {
    if (this.state && this.state.isVisible) {
      const size = this.props.size;
      const mapSize = mapSizeFn(size);

      return <div style={styles.deck}>{mapSize((row)=> {
        return <div key={row} style={styles.row}>
          {mapSize((column)=> <Card card={this.state.deck[row * size + column]} key={column}/>)}
        </div>;
      })}</div>;
    } else return null;
  }
});

function getStyles() {
  return {
    row: {
      display: 'block'
    },
    deck: {
      margin: 50,
      boxShadow: '0 0 10px 1px',
      display: 'inline-block',
    }
  };
}
