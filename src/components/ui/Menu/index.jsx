import React from 'react';
import { Link } from 'react-router';
import './style.scss';

class Menu extends React.Component {

  render() {
    const items = this.props.items.map((item, i) => {
      return (
        <li key={`menu-item-${i}`}>
          { item.path ? <Link to={item.path}>{item.name}</Link> :
            item.name }
        </li>
      );
    });
    return (
      <nav className={`c-menu -${this.props.orientation} -align-${this.props.align}`}>
        <ul>
          {items}
        </ul>
      </nav>
    );
  }

}

Menu.propTypes = {
  items: React.PropTypes.array,
  align: React.PropTypes.string,
  orientation: React.PropTypes.string,
};

Menu.defaultProps = {
  items: [],
  align: 'right',
  orientation: 'horizontal'
};

export default Menu;
