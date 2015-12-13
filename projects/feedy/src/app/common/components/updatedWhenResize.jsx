import AppComponent from 'components/AppComponent';

import responsive from 'helpers/responsive';
import getRestProps from 'helpers/pure/getRestProps';

export default Component => {
  class UpdatedWhenResize extends AppComponent {
    constructor(props) {
      super(props);

      this.updateWidthState = this.updateWidthState.bind(this);
    }
    getDefaultData() {
      return {
        screenWidth: null,
      };
    }
    componentDidMount() {
      if (window.attachEvent) window.attachEvent('onresize', this.updateWidthState);
      else if (window.addEventListener) {
        window.addEventListener('resize', this.updateWidthState, true);
      }
    }
    updateWidthState() {
      this.setData({
        screenWidth: responsive.updateCurrentWidth(),
      });
    }
    render() {
      const data = this.state.data;

      return (<div>
        <Component screenWith={data.get('screenWidth')} {...getRestProps(this)}/>
      </div>);
    }
  }

  return UpdatedWhenResize;
};
