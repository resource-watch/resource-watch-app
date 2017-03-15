import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import Intro from 'components/common/Intro';

function GetInvolved() {
  const title = 'Get Involved';
  const intro = ['Lorem ipsum sit amet casius sem', 'lacinia quam venenatis vestibulum'];

  return (
    <div className="p-get-involved">
      <div className="c-page about">
        <Intro title={title} intro={intro} />
        <section className="l-section">
          <div className="l-container">
            <div className="row collapse">
              <div className="column small-12 medium-8 medium-offset-2">
               
              </div>
            </div>
          </div>
        </section>

        <div className="row collapse">
          <div className="column small-12">
            <Banner className="partners">
              <h3 className="c-text -header-normal -thin">See yourself as part <br/>of this team?</h3>
              <button className="c-btn -primary">
                Get in touch
              </button>
            </Banner>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetInvolved;
