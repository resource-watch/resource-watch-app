import React from 'react';
import classnames from 'classnames';

function Rating(props) {
  const className = classnames({
    'c-rating': true,
    [props.className]: props.className
  });

  return (
    <div className={className}>
      <svg className="c-icon -small icon-star-full"><use xlinkHref="#icon-star-full"></use></svg>
      <span>{props.rating}</span>
    </div>
  );
}

Rating.propTypes = {
  rating: React.PropTypes.number
};

export default Rating;
