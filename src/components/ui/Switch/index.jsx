import React from 'react';
import './style.scss';

class Switch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: !!props.active
    };

    // BINDINGS
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active
    });
  }

  onToggle() {
    this.setState({
      active: !this.state.active
    }, () => {
      if (this.props.onChange) this.props.onChange(this.state.active);
    });
  }

  render() {
    const { active } = this.state;
    const activeClass = (this.state.active) ? '-active' : null;

    return (
      <div className="c-switch">
        <span
          className={`switch-element ${activeClass}`}
          onClick={this.onToggle}
        >
          <span />
        </span>
      </div>
    );
  }
}

Switch.propTypes = {
  active: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

export default Switch;
