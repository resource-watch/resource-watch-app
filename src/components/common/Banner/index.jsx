import React from 'react';
import { Link } from 'react-router';

function Banner(props) {
  const styles = props.styles || {};

  return (
    <section
      className={`c-banner l-section -bg -bg-dark -light -viel ${props.className}`}
      style={styles}
    >
      <div className="l-container">
        <div className="row">
          <div className="c-banner column small-12">
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
