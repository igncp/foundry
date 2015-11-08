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
        <div id="menu-bar-cross" onClick={this.props.onClose}>x</div>
        <ul>
          {_.map(this.props.items, (item, index)=> {
            return (<a key={index} href={item[1]}>{item[0]}</a>)
          })}
        </ul>
    </div>);
  }
});

require('./menu-bar.scss');
