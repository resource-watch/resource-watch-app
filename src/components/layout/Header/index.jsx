import React from 'react';
import { Link } from 'react-router';
import Button from 'components/ui/Button';
import Dropdown from 'components/ui/Dropdown';

import Logo from 'components/layout/Logo';
import Menu from 'components/ui/Menu';
import './style.scss';

const dashboard = [
  { name: 'Places', path: '/dashboards' },
];

const explore = [
  { name: 'Planet Pulse', path: '/planet-pulse' },
  { name: 'All Data', path: '/explore' },
];

const navigationLinks = [
  { name: <Dropdown title="Explore Data" items={explore}/> },
  { name: <Dropdown title="Dashboard" items={dashboard}/> },
  { name: 'Insights', path: '/insights' },
  { name: <Button title='Get Involved' /> },
];

class Header extends React.Component {

  render() {
    return (
      <header className="c-header">
        <div className="header-secondary">
          {/* Language selector */}
        </div>

        <div className="header-main">
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

}

export default Header;
