import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

function CardStatic(props) {
  const isIntroString = typeof props.intro === 'string';
  const style = { background: props.background, backgroundSize: props.backgroundSize || 'cover' };
  const className = classNames({
    'c-card-static': true,
    [props.className]: props.className
  });

  return (
    <div className={className} style={style}>
      {props.children}
    </div>
  );
}

CardStatic.propTypes = {
  children: React.PropTypes.any.isRequired,
  background: React.PropTypes.string
};

CardStatic.defaultProps = {
  children: ''
};

export default CardStatic;
