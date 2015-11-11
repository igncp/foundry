import actions from 'actions.js';

const styles = getStyles();

export default React.createClass({
  propTypes: {
    card: React.PropTypes.shape({
      id: React.PropTypes.number,
      isFaceDown: React.PropTypes.bool,
    }),
  },
  render() {
    const isFaceDown = this.props.card.isFaceDown;

    return (<div
      style={isFaceDown ? {...styles.card, ...styles.cardFaceDown} : styles.card}
      onClick={()=> actions.handleCardClick(this.props.card.id)}>
      {isFaceDown === false ? <p style={styles.number}>{this.props.card.value}</p> : null}
    </div>);
  }
});

function getStyles() {
  return {
    card: {
      border: 'solid 1px #333',
      cursor: 'pointer',
      position: 'relative',
      display: 'inline-block',
      height: 100,
      width: 100,
    },
    cardFaceDown: {
      background: '#9B9',
    },
    number: {
      position: 'absolute',
      top: 20,
      left: 40,
      fontSize: 20,
    }
  };
}