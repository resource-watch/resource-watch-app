import React from 'react';
import './style.scss';

function Apps(props) {
  return (
    <div className="c-page partners">
      <h1>APPS</h1>
    </div>
  );
}

Apps.propTypes = {
  appsList: React.PropTypes.array
};

Apps.defaultProps = {
  appsList: []
};

export default Apps;
