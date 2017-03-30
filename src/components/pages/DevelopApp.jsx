import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import Intro from 'components/common/Intro';

function DevelopApp() {
  const title = 'Develop app';
  const intro = 'An open platform for everyone to explore accurate, up-to-date insight about our planet';

  return (
    <div className="p-develop-app">
      <div className="c-page">
        <Intro title={title} intro={intro} />
        <section className="l-section">
          <div className="l-container">
            <div className="row collapse">
              <div className="column small-12 medium-8 medium-offset-2">
                <p className="c-text -extra-big -dark">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus.</p>
                <p className="c-text -extra-big -dark">Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p className="c-text -extra-big -dark">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="row collapse">
          <div className="column small-12">
            <Banner className="partners">
              <h3 className="c-text -header-normal -normal">We have a massive opportunity<br/>to build a sustainable society</h3>
              <button className="c-btn -primary -filled">
                <Link to="/about/partners">Partners list</Link>
              </button>
            </Banner>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevelopApp;
