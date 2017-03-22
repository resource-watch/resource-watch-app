import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';

function Home() {
  return (
    <div className="p-home">
      <div className="c-page">
        <Banner className="intro">
          <h3 className="title c-text -header-huge -thin">Quick and easy access<br/>to a world of resource data</h3>
          <p className="c-text -huge -thin">Explore the latest data, make insights, and help build a more sustainable planet</p>
        </Banner>
        
        <Banner className="get-involved">
          <div className="row">
            <div className="column small-12 medium-6">
              <h3 className="title c-text -header-huge -thin">Get Involved</h3>
              <p className="c-text -big">We've brought together the best datasets related to natural resources, so you can find new insights, influence decisions and change the world. There's a world of opportunity to take this futher; here’s some ideas to get you started...</p>
            </div>
          </div>
          <div className="row">
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Submit an insight</Link></button>
            </div>
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Contribute data</Link></button>
            </div>
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Join the community</Link></button>
            </div>
            <div className="column small-12 medium-3">
              <button className="c-btn -transparent"><Link to="/get-involved#">Develop your app</Link></button>
            </div>
          </div>
        </Banner>        
      </div>
    </div>
  );
}

export default Home;
