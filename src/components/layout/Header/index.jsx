import React from 'react';
import { Link } from 'react-router';

import Logo from 'components/layout/Logo';
import Menu from 'components/ui/Menu';
import './style.scss';

const navigationLinks = [
  { name: 'Insights', path: '/insights' },
  { name: 'Explore', path: '/explore' },
  { name: 'Dashboards', path: '/dashboards' },
  { name: 'Planet Pulse', path: '/pulse' },
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
