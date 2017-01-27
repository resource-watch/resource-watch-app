import React from 'react';
import Globe from '../../vis/Globe';

class Pulse extends React.Component {

  render() {
    return (
      <div>
        <Globe pointLightColor={0xcccccc}
          ambientLightColor={0x444444}
          enableZoom={true}
          lightPosition={'right'} />
      </div>
    );
  }

}

export default Pulse;
