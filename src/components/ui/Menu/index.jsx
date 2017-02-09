import React from 'react';
import { Link } from 'react-router';
import './style.scss';

const Menu = ({ items, orientation, align }) => {
  const listItems = items.map(item => (
    <li key={`menu-item-${item.name}`}>
      <Link to={item.path}>{item.name}</Link>
    </li>
  ));

  return (
    <nav className={`c-menu -${orientation} -align-${align}`}>
      <ul>
        {listItems}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  items: React.PropTypes.array,
  align: React.PropTypes.string,
  orientation: React.PropTypes.string
};

Menu.defaultProps = {
  items: [],
  align: 'right',
  orientation: 'horizontal'
};

export default Menu;
