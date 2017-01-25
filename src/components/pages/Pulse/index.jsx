import React from 'react';
import Globe from 'components/vis/Globe';

class Pulse extends React.Component {

  render() {
    return (
      <div>
        <Globe radius={294} />
      </div>
    );
  }
}

Pulse.propTypes = {
  pulse: React.PropTypes.object,
  getDatasets: React.PropTypes.func
};


export default Pulse;
