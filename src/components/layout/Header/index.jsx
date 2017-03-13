import React from 'react';
import { Link } from 'react-router';

// Components
import Button from 'components/ui/Button';
import Dropdown from 'components/ui/Dropdown';
import Logo from 'components/layout/Logo';
import Menu from 'components/ui/Menu';

import './style.scss';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataDropdownActive: false
    };

    // BINDINGS
    this.triggerOpenDataDropdown = this.triggerOpenDataDropdown.bind(this);
    this.handleChangeVisibilityDataDropdown = this.handleChangeVisibilityDataDropdown.bind(this);
    this.closeDataDropdown = this.closeDataDropdown.bind(this);
  }

  triggerOpenDataDropdown(e) {
    e.stopPropagation();
    this.setState({ dataDropdownActive: !this.state.dataDropdownActive });
  }

  handleChangeVisibilityDataDropdown(visibility) {
    this.setState({ dataDropdownActive: visibility });
  }

  closeDataDropdown() {
    this.setState({ dataDropdownActive: false });
  }

  render() {
    const dataDropDown = (
      <div>
        <a
          onClick={this.triggerOpenDataDropdown}
        >
        Data
        </a>
        <Dropdown
          className="data-dropdown"
          active={this.state.dataDropdownActive}
          onChangeVisibility={this.handleChangeVisibilityDataDropdown}
        >
          <ul onClick={this.closeDataDropdown}>
            <li><Link to="/explore">Explore Datasets</Link></li>
            <li><Link to="/dashboards">Dashboards</Link></li>
            <li><Link to="/planet-pulse">Planet Pulse</Link></li>
          </ul>
        </Dropdown>
      </div>
      );

    const navigationLinks = [
      { name: dataDropDown },
      { name: 'Insights', path: '/insights' },
      { name: 'About', path: '#' },
      { name: <a className="c-button -inverse -primary">Get Involved</a> }
    ];

    const mainClass = this.props.fullScreen ? '-fullScreen' : '';

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

}

Header.propTypes = {
  dataDropdownActive: React.PropTypes.bool
};

export default Header;
