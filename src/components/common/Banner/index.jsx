import React from 'react';
import { Link } from 'react-router';

function Banner(props) {
  const styles = props.styles || {};
  const className = props.className ? props.className : '';

  return (
    <section
      className={`c-banner -light ${className}`}
      style={styles}
    >
      <div className="l-container">
        <div className="row">
          <div className="column small-12">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
}

Banner.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  styles: React.PropTypes.object
};

export default Banner;
