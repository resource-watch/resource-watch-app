import React from 'react';
import './style.scss';

function Spinner({ isLoading, style }) {
  const loading = (isLoading) ? '-loading' : '';
  return (
    <div className={`c-spinner ${loading}`}>
      <div className="spinner-box" style={style}>
        <div className="icon" />
      </div>
    </div>
  );
}

Spinner.propTypes = {
  isLoading: React.PropTypes.bool,
  style: React.PropTypes.object
};

export default Spinner;
