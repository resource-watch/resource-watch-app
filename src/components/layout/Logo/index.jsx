import React from 'react';
import './style.scss';

function Logo() {
  return (
    <svg className="c-logo">
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-logo" />
    </svg>
  );
}

export default Logo;
