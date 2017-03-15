import React from 'react';
import Banner from 'components/common/Banner';

function Intro(props) {
  return (
    <div className="c-intro">
      <div className="intro-bg">
        <div className="top"></div>
      </div>
      <section className="l-section">
        <div className="row">
          <div className="column small-12">
            <Banner className="intro"></Banner>
          </div>
          <div className="column small-12 medium-8 medium-offset-2">
            <h1 className="c-text -header-big -thin -dark">{props.title}</h1>
            <p className="c-text -huge -italic">{props.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

Intro.propTypes = {
  title: React.PropTypes.string.isRequired,
  intro: React.PropTypes.string.isRequired
};

Intro.defaultProps = {
  title: '',
  intro: ''
};

export default Intro;
