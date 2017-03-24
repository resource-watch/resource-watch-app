import React from 'react';
import { Link } from 'react-router';
import CompoundMenu from 'components/ui/CompoundMenu';
import Carousel from 'components/ui/Carousel';

const data = [
  { name: 'Data', path: '#' },
  { name: 'Explore Datasets', path: '/explore' },
  { name: 'Dashboards', path: '/dashboards' },
  { name: 'Planet Pulse', path: '/planet-pulse' }
];

const about = [
  { name: 'About', path: '/about' },
  { name: 'Partners', path: '/about/partners' }
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

class Footer extends React.Component {

  componentWillMount() {
    this.props.getPartners();
  }

  setPartnersList() {
    return this.props.list.map((p, i) => (
      <div key={i} className="item">
        <Link to={`/about/partners/${p.id}`}>
          <img className="-img" src={`${config.CMS_API_URL}${p.attributes.logo.thumb}`}/>
        </Link>
      </div>
    ));
  }

  render() {
    const menuData = [data, about, insights, getInvolved];
    const items = this.setPartnersList();

    return (
      <footer className="c-footer">
        <div className="footer-intro">
          <h1 className="title"><Link to="/about/partners">Partners</Link></h1>
          <div className="partners row">
            <div className="column small-12">
              <Carousel items={items.length ? items : [<div key="0"></div>]} />
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
}

export default Footer;
