import React from 'react';
import Logo from '../Logo';
import Menu from '../../ui/Menu';
import { Link } from 'react-router';
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
        <div className="main-navigation">
          <div className="brand">
            <Link to='/'><Logo /></Link>
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
