import React from 'react';
import './style.scss';

class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      properties: props.properties,
      className: props.className
    };

    // BINDINGS
    this.triggerClick = this.triggerClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      className: nextProps.className
    });
  }

  triggerClick(e) {
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    const { className, children, properties } = this.props;

    return (
      <button
        {...properties}
        className={`c-button ${className}`}
        onClick={this.triggerClick}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.any,
  properties: React.PropTypes.object,
  className: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

export default Button;
