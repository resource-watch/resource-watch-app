import React from 'react';
import { Link } from 'react-router';
import './style.scss';

class Menu extends React.Component {

  render() {
    const items = this.props.items.map((item, i) => {
      return (
        <li key={`menu-item-${i}`}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      );
    });
    return (
      <nav className={`c-menu -${this.props.orientation}`}>
        <ul>
          {items}
        </ul>
      </nav>
    );
  }

}

Menu.propTypes = {
  items: React.PropTypes.array,
  orientation: React.PropTypes.string
};

Menu.defaultProps = {
  items: [],
  orientation: 'horizontal'
};

export default Menu;
