require('./menu-trigger.scss');

export default React.createClass({
  propTypes: {
    onTrigger: React.PropTypes.func,
  },
  render() {
    return (
      <div id="menu-trigger" onClick={this.props.onTrigger}>Trigger</div>);
  }
});
