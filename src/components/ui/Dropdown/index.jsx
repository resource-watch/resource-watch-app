import React from 'react';
import { Link } from 'react-router';
import './style.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    // bindings
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProp(newProps) {
    debugger;
  }

  render() {
    const items = this.props.items.map((item, i) => {
      return (
        <li key={`item-${i}`}>
          { item.path ?
            <Link to={item.path}>{item.name}</Link> :
            item.name }
        </li>
      );
    });

    const className = `c-dropdown${this.state.active ? ' -active' : ''}`

    return (
      <div className={className} onClick={this.handleClick}>
        {this.props.title}
        <ul className="dropdown">
          {items}
        </ul>
      </div>
    );
  }

  handleClick(e) {
    this.setState({ active: !this.state.active });
  }
}

export default Dropdown;
