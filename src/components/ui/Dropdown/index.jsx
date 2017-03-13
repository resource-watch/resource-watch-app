import React from 'react';
import classNames from 'classnames';

import './style.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active || false
    };

    // Bindings
    this.handleScreenClick = this.handleScreenClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active }, () => {
      if (this.state.active) {
        window.addEventListener('click', this.handleScreenClick);
      }
    });
  }

  handleScreenClick(e) {
    if (this.el.contains && !this.el.contains(e.target)) {
      window.removeEventListener('click', this.handleScreenClick);
      this.setState({ active: false }, () => {
        this.props.onChangeVisibility(false);
      });
    }
  }

  render() {
    const className = classNames({
      'c-dropdown': true,
      dropdown: true,
      '-active': this.state.active,
      '-arrow-right': this.props.arrowPosition === 'right',
      '-arrow-left': this.props.arrowPosition === 'left'
    });

    return (
      <div
        ref={(node) => { this.el = node; }}
        className={className}
      >
        {this.props.children}
      </div>
    );
  }

}

Dropdown.defaultProps = {
  onChangeVisibility: null,
  children: null,
  active: false,
  arrowPosition: 'right'
};

Dropdown.propTypes = {

  children: React.PropTypes.any,
  active: React.PropTypes.bool,
  arrowPosition: React.PropTypes.string,

  onChangeVisibility: React.PropTypes.func.isRequired

};

export default Dropdown;
