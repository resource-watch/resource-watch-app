import React from 'react';

import './style.scss';

class Legend extends React.Component {
  render() {
    console.log(this.props.layerActive);
    return (
      <div className="c-legend">
        <div className="l-container">
          Legend
        </div>
      </div>
    );
  }

}

Legend.propTypes = {
  layerActive: React.PropTypes.object,
};

Legend.defaultProps = {
  layerActive: null,
};

export default Legend;
