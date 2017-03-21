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
      dataDropdownActive: false
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



  onScreenClick(e) {
    const el = document.querySelector('.c-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      this.toggleDataDropdown();
    }
  }

  toggleDataDropdown() {
    const { dataDropdownActive } = this.state;

    // requestAnimationFrame
    //   - Goal: Prevent double trigger at first atempt
    //   - Issue: When you add the listener the click event is not finished yet
    //            so it will trigger onScreenClick
    //   - Stop propagation?: if I put e.stopPropagation clicking on another
    //                        filter btn won't trigger the screenClick,
    //                        so we will have 2 dropdown filters at the same time
    requestAnimationFrame(() => window[dataDropdownActive ?
      'removeEventListener' : 'addEventListener']('click', this.onScreenClick));

    this.setState({ dataDropdownActive: !dataDropdownActive });
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
          onClick={this.toggleDataDropdown}
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
                onClick={this.toggleDataDropdown}
              >
                Explore Datasets
              </Link>
            </li>
            <li>
              <Link
                to="/dashboards"
                onClick={this.toggleDataDropdown}
              >
                Dashboards
              </Link>
            </li>
            <li>
              <Link
                to="/planet-pulse"
                onClick={this.toggleDataDropdown}
              >
                Planet Pulse
              </Link>
            </li>
          </ul>
        }
      </TetherComponent>
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
  fullScreen: React.PropTypes.bool
};

export default Header;
