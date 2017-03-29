import React from 'react';

class GlobeTooltip extends React.Component {

  render() {
    return (
      <div>
        <div><p>{this.props.value}</p></div>
      </div>
    );
  }
}

GlobeTooltip.propTypes = {
  // Define the chart data
  value: React.PropTypes.string
};

export default GlobeTooltip;
