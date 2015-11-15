import actions from 'actions.js';

const styles = getStyles();

export default React.createClass({
  propTypes: {
    card: React.PropTypes.shape({
      id: React.PropTypes.number,
      isFaceDown: React.PropTypes.bool,
    }),
  },
  onCardClick() {
    if (this.props.card.isSolved !== true) {
      actions.handleUnsolvedCardClick(this.props.card.id)
    }
  },
  render() {
    const isFaceDown = this.props.card.isFaceDown;
    const isSolved = this.props.card.isSolved;

    return (<div
      style={{...styles.card, ...(isFaceDown ? styles.cardFaceDown : {}), ...(isSolved ? styles.cardSolved : {})}}
      onClick={this.onCardClick}>
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
      background: '#ACC8F3',
    },
    cardSolved: {
      background: '#9B9',
      cursor: 'default',
    },
    number: {
      position: 'absolute',
      top: 20,
      left: 40,
      fontSize: 20,
    }
  };
}