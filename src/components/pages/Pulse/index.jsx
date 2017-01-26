import React from 'react';
import Globe from '../../vis/Globe';

class Pulse extends React.Component {

  render() {
    return (
      <div>
        <Globe pointLightColor={0xc7e0f9}
          ambientLightColor={0x061725}
          enableZoom={false}
          lightPosition={'right'} />
      </div>
    );
  }

}

export default Pulse;
