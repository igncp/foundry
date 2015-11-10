import actions from 'actions.js';

const styles = getStyles();

export default React.createClass({
  render() {
    return (<div style={styles.card} onClick={actions.updateScore}/>);
  }
});

function getStyles() {
  return {
    card: {
      border: 'solid 1px #333',
      cursor: 'pointer',
      display: 'inline-block',
      height: 100,
      width: 100,
    }
  };
}