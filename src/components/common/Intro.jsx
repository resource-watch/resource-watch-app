import React from 'react';
import Banner from 'components/common/Banner';

function Intro(props) {
  const isIntroString = typeof props.intro === 'string';

  return (
    <div className="c-intro">
      <div className="intro-bg">
        <div className="top"></div>
      </div>
      <section className="l-section">
        <div className="row">
          <div className="column small-12">
            <Banner className="intro" />
          </div>
          <div className="column small-12 medium-8 medium-offset-2">
            <h1 className="c-text -header-big -thin -dark">{props.title}</h1>
            <p className="c-text -huge -italic">
              {!isIntroString ?
                props.intro.map((line, i) => (
                  <span key={i}>
                    {line}{(i !== props.intro.length - 1) && <br /> }
                  </span>)) :
                props.intro
              }
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

Intro.propTypes = {
  title: React.PropTypes.string.isRequired,
  intro: React.PropTypes.any
};

Intro.defaultProps = {
  title: '',
  intro: ''
};

export default Intro;
