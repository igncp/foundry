import classnames from 'node_modules/classnames';

export default React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    onClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
  },
  render() {
    return (
      <div id="menu-bar" className={classnames({visible: this.props.visible})}>
        <div id="menu-bar-cross" onClick={this.props.onClose}>&#x2715;</div>
        <ul>
          {_.map(this.props.items, (item, index)=> {
            return (
              <li key={index} onClick={item.action}>{item.name}</li>
            );
          })}
        </ul>
    </div>);
  }
});

require('./menu-bar.scss');
