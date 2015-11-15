import common from 'common/js/common.js';
import scoreStore from 'stores/scoreStore.js';

const styles = getStyles();

export default React.createClass({
  mixins: [Reflux.listenTo(scoreStore,"onScoreChange")],
  onScoreChange({score}) {
   this.setState({
    score: score,
   });
  },
  onIndexClick(e) {
    e.preventDefault();
    common.goToIndex();
  },
  render() {
    return (<div style={styles.panel}>
      <p>Score: {this.state ? this.state.score : 0}</p>
      <p><a href="#" onClick={this.onIndexClick}>index</a></p>
    </div>);
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