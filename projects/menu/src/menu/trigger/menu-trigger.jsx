require('./menu-trigger.scss');

export default React.createClass({
  propTypes: {
    onTrigger: React.PropTypes.func,
  },
  render() {
    return (
      <div className="menu-trigger" onClick={this.props.onTrigger}><span></span></div>);
  }
});
