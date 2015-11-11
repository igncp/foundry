import scoreStore from 'stores/scoreStore.js';

const styles = getStyles();

export default React.createClass({
  componentDidMount: function() {
    this.unsubscribe = scoreStore.listen(this.onScoreChange);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  onScoreChange(score) {
   this.setState({
    score: score,
   })
  },
  render() {
    return (<div style={styles.panel}>Score: {this.state ? this.state.score : 0}</div>);
  }
});

function getStyles() {
  return {
    panel: {
      float: 'right',
      width: '50%',
      paddingTop: 20,
    },
  };
}