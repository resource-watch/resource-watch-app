import React from 'react';
import LegendType from 'components/layout/LegendType';

import './style.scss';

class Legend extends React.Component {
  render() {
    if (this.props.layerActive) {
      return (
        <div className="c-legend">
          <div className="l-container">
            <ul className="c-legend-list">
              <li className="c-legend-item">
                <header className="legend-item-header">
                  <h3>
                    <span className="name">{this.props.layerActive.name}</span>
                  </h3>
                </header>
                <LegendType config={this.props.layerActive.legendConfig} />
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return null;
  }
}

Legend.propTypes = {
  layerActive: React.PropTypes.object
};

Legend.defaultProps = {
  layerActive: null
};

export default Legend;
