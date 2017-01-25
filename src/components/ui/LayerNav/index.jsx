import React from 'react';
import './style.scss';

class LayerNav extends React.Component {

  render() {
    return (
      <div className="c-layer-nav">
        Layer Manager
      </div>
    );
  }

}

LayerNav.propTypes = {
  items: React.PropTypes.array
};

LayerNav.defaultProps = {
  items: []
};

export default LayerNav;
