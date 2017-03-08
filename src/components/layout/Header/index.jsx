import React from 'react';
import { Link } from 'react-router';
import Button from 'components/ui/Button';
import Dropdown from 'components/ui/Dropdown';

import Logo from 'components/layout/Logo';
import Menu from 'components/ui/Menu';
import './style.scss';

const data = [
  { name: 'Explore Datasets', path: '/explore' },
  { name: 'Dashboards', path: '/dashboards' },
  { name: 'Planet Pulse', path: '/planet-pulse' },
];

const navigationLinks = [
  { name: <Dropdown title="Data" items={data} active={false} /> },
  { name: 'Insights', path: '/insights' },
  { name: 'About', path: '#' },
  { name: <Button properties={{ className: '-inverse -primary'}}>Get Involved</Button> }
];

function Header(props) {
  const mainClass = props.fullScreen ? '-fullScreen' : '';

  return (
    <header className="c-header">
      <div className="header-secondary">
        {/* Language selector */}
      </div>

      <div className={`header-main ${mainClass}`}>
        <div className="brand">
          <Link to="/"><Logo /></Link>
        </div>
        <div className="menu">
          <Menu items={navigationLinks} />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  fullScreen: React.PropTypes.bool
};

export default Header;
