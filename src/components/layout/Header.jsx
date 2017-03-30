import React from 'react';
import { Link } from 'react-router';

// Components
import Logo from 'components/layout/Logo';
import Menu from 'components/ui/Menu';
import TetherComponent from 'react-tether';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataDropdownActive: false,
      aboutDropdownActive: false
    };

    // BINDINGS
    this.toggleDataDropdown = this.toggleDataDropdown.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  componentDidMount() {
    console.info('didMount');
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e, specificDropdown) {
    const el = document.querySelector('.c-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      if (specificDropdown) this.toggleDataDropdown(e, specificDropdown);
      else {
        this.toggleDataDropdown(e, 'dataDropdownActive');
        this.toggleDataDropdown(e, 'aboutDropdownActive');
      }
    }
  }

  toggleDataDropdown(e, specificDropdown) {
    e.stopPropagation();
    const dropdown = this.state[specificDropdown];
    const newObject = {};

    // requestAnimationFrame
    //   - Goal: Prevent double trigger at first atempt
    //   - Issue: When you add the listener the click event is not finished yet
    //            so it will trigger onScreenClick
    //   - Stop propagation?: if I put e.stopPropagation clicking on another
    //                        filter btn won't trigger the screenClick,
    //                        so we will have 2 dropdown filters at the same time
    requestAnimationFrame(() => {
      window[dropdown ?
        'removeEventListener' : 
        'addEventListener']('click', (e) => this.onScreenClick(e, specificDropdown));
    });

    newObject[specificDropdown] = !dropdown;
    this.setState(newObject);
  }

  render() {
    const dataDropDown = (
      <TetherComponent
        attachment="top right"
        constraints={[{
          to: 'window'
        }]}
        targetOffset="0px 100%"
        classes={{
          element: 'c-tooltip -arrow-right'
        }}
      >
        {/* First child: This is what the item will be tethered to */}
        <a
          onClick={(e) => this.toggleDataDropdown(e, 'dataDropdownActive')}
        >
        Data
        </a>
        {/* Second child: If present, this item will be tethered to the the first child */}
        { this.state.dataDropdownActive &&
          <ul
            className="data-dropdown"
          >
            <li>
              <Link
                to="/explore"
                onClick={(e) => this.toggleDataDropdown(e, 'dataDropdownActive')}
              >
                Explore Datasets
              </Link>
            </li>
            <li>
              <a
                href="/countries"
                onClick={(e) => this.toggleDataDropdown(e, 'dataDropdownActive')}
              >
                Dashboards
              </a>
            </li>
            <li>
              <Link
                to="/planet-pulse"
                onClick={(e) => this.toggleDataDropdown(e, 'dataDropdownActive')}
              >
                Planet Pulse
              </Link>
            </li>
          </ul>
        }
      </TetherComponent>
      );

    const aboutDropDown = (
      <TetherComponent
        attachment="top right"
        constraints={[{
          to: 'window'
        }]}
        targetOffset="0px 100%"
        classes={{
          element: 'c-tooltip -arrow-right'
        }}
      >
        {/* First child: This is what the item will be tethered to */}
        <a
          onClick={(e) => this.toggleDataDropdown(e, 'aboutDropdownActive')}
        >
        About
        </a>
        {/* Second child: If present, this item will be tethered to the the first child */}
        { this.state.aboutDropdownActive &&
          <ul
            className="data-dropdown"
          >
            <li>
              <Link
                to="/about"
                onClick={(e) => this.toggleDataDropdown(e, 'aboutDropdownActive')}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/about/partners"
                onClick={(e) => this.toggleDataDropdown(e, 'aboutDropdownActive')}
              >
                Partners
              </Link>
            </li>
          </ul>
        }
      </TetherComponent>
      );

    const navigationLinks = [
      { name: dataDropDown },
      { name: <a href="/insights">Insights</a> },
      { name: aboutDropDown },
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
  fullScreen: React.PropTypes.bool
};

export default Header;
