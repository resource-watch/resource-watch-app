import React from 'react';
import { Link } from 'react-router';
import CompoundMenu from 'components/ui/CompoundMenu';
import partners from 'components/common/Partners/partners.json';
import Carousel from 'components/ui/Carousel';

import './style.scss';

const data = [
  { name: 'Data', path: '#' },
  { name: 'Explore Datasets', path: '/explore' },
  { name: 'Dashboards', path: '/dashboards' },
  { name: 'Planet Pulse', path: '/planet-pulse' }
];

const about = [
  { name: 'About', path: '/about' },
  { name: 'Partners', path: '/partners' }
];

const insights = [
  { name: 'Insights', path: '/insights' },
  { name: 'Recent insights', path: '#' },
  { name: 'Highlighted insights', path: '#' }
];

const getInvolved = [
  { name: 'Get involved', path: '#' },
  { name: 'Submit an insight', path: '#' },
  { name: 'Contribute data', path: '#' },
  { name: 'Join the community', path: '#' }
];

const items = partners.map((p, i) => (
  <div key={i} className="item">
    <Link to={`/partners/${p.name}`}>
      <img className="-img" src={require(`images/partners/${p.img}`)}/>
    </Link>
  </div>
));

function Footer() {
  const menuData = [data, about, insights, getInvolved];

  return (
    <footer className="c-footer">
      <div className="footer-intro">
        <h5 className="title"><Link to="/partners">Partners</Link></h5>
        <div className="partners row">
          <div className="column small-12">
            <Carousel items={items} />
          </div>
        </div>
      </div>

      <div className="footer-main">
        <CompoundMenu items={menuData} />
      </div>

      <div className="footer-terms">
        <div className="terms row">
          <div className="column small-12">
            <p>Terms of Service — Privacy</p>
            <p>© 2015 - World Resources Watch</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
