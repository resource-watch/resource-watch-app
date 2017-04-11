import React from 'react';
import { Link } from 'react-router';
import Banner from 'components/common/Banner';
import Rating from 'components/common/Rating';
import Button from 'components/ui/Button';
import Breadcrumbs from 'components/ui/Breadcrumbs';

const breadcrumbs = [
  { name: 'Get Involved', url: '/get-involved' },
  { name: 'Apps', url: '/get-involved/apps' }
];

function AppDetail(props) {
  const buttonClasses = 'c-btn -filled -primary';
  const properties = { className: buttonClasses };

  return (
    <div className="p-app-detail">
      <div className="c-page">
        <section className="l-section intro -breadcrumbs">
          <div className="row">
            <div className="column small-12">
              <Breadcrumbs items={breadcrumbs} />
              <h1 className="title c-text -header-big -dark -thin">
                {props.app.name}
                <Rating rating={props.app.stars} className="c-text -big -normal -yellow" />
              </h1>
              <p className="source">by <a href="#">{props.app.source}</a></p>
            </div>
          </div>

          <div className="row">
            <div className="column small-12 medium-7">
              <h3 className="c-text -huger -primary -thin">Description</h3>
              <p className="c-text -big -dark">{props.app.description}</p>
            </div>
            <div className="column small-12 medium-4 medium-offset-1">
              <div className="actions">
                <Button properties={properties}>Available for iOS</Button>
                <Button properties={properties}>Available for Android</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="l-section">
          <div className="row">
            <div className="column small-12 medium-7">
              <h3 className="c-text -huger -primary -thin">Details</h3>
              <p className="c-text -big -dark">{props.app.specs}</p>
              <p className="c-text -big -dark">Languages: {props.app.languages.join(', ')}</p>
              <a href="#" className="c-text -big">Contact the developer</a>
            </div>
          </div>
        </section>

        <section className="l-section">
          <div className="row">
            <div className="column small-12">
              <h1 className="c-text -huger -primary -thin">Planet Pulse</h1>
              <Banner className="pulse">
                <h3 className="c-text -header-normal -normal">Real-time data<br /> monitoring the planet</h3>
                <button className="c-btn -primary -filled">
                  <Link to="/planet-pulse">LAUNCH PLANET PULSE</Link>
                </button>
              </Banner>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

AppDetail.propTypes = {
  app: React.PropTypes.object
};

AppDetail.defaultProps = {
  app: {}
};

export default AppDetail;
