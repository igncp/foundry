export default (props) => {
  return (<div>
    {props.isActive && 
      <div className="loader">
        <div className="loader-animation">
          <div className="loader-d1" />
          <div className="loader-d2" />
          <div className="loader-d3" />
          <div className="loader-d4" />
          <div className="loader-d5" />
        </div>
      </div>
    }
  </div>);
};

require('./loader.scss');