import React from 'react';
import './style.scss';


class Button extends React.Component {

  render() {
    const className = `c-button ${this.props.className ? this.props.className : ''}`;
    return (
      <button className={className}>
        {this.props.title}
      </button>
    );
  }

}

export default Button;
