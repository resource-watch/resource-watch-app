import React from 'react';
import { Link } from 'react-router';
import './style.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active || false
    };

    // Bindings
    this.handleClick = this.handleClick.bind(this);
    this.handleScreenClick = this.handleScreenClick.bind(this);
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
      <div ref={(node) => { this.el = node; }} className={className} onClick={this.handleClick}>
        {this.props.title}
        <ul className="dropdown">
          {items}
        </ul>
      </div>
    );
  }

  handleClick(e) {
    this.setState({ active: !this.state.active });
    window.addEventListener('click', this.handleScreenClick);
  }

  handleScreenClick(e) {
    if (this.el.contains && !this.el.contains(e.target)) {
      this.setState({ active: false });
      window.removeEventListener('click', this.handleScreenClick);
    }
  }
}

export default Dropdown;
