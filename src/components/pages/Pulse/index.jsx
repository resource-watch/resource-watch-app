import React from 'react';
import Globe from '../../vis/Globe';

class Pulse extends React.Component {

  render() {
    return (
      <div>
        <h1>Planet pulse</h1>
        <Globe radius={294} />
      </div>
    );
  }

}

export default Pulse;
