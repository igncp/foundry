import scoreStore from 'stores/scoreStore.js';

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
    return (<div>Score: {this.state ? this.state.score : 0}</div>);
  }
});
