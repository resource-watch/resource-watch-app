import React from 'react';
import Button from 'components/ui/Button';
import './style.scss';


class ZoomControl extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      className: props.className
    };

    // BINDINGS
    this.triggerZoomIn = this.triggerZoomIn.bind(this);
    this.triggerZoomOut = this.triggerZoomOut.bind(this);
  }

  triggerZoomIn() {
    const newValue = this.state.value + 1;
    if (newValue <= this.props.maxValue) {
      this.setState({ value: newValue });
      this.props.onZoomIn(this.state.value);
    }
  }

  triggerZoomOut() {
    const newValue = this.state.value - 1;
    if (newValue >= this.props.minValue) {
      this.setState({ value: this.state.value - 1 });
      this.props.onZoomOut(this.state.value);
    }
  }

  render() {
    const { properties, onZoomIn, onZoomOut } = this.props;

    return (
      <ul
        {...properties}
        className={`c-zoom-control ${properties.className || ''}`}
      >
        <li>
          <Button onClick={(onZoomIn) ? this.triggerZoomIn : null} />
        </li>
        <li>
          <Button onClick={(onZoomOut) ? this.triggerZoomOut : null} />
        </li>
      </ul>
    );
  }
}

ZoomControl.propTypes = {
  properties: React.PropTypes.object,
  orientation: React.PropTypes.string,
  maxValue: React.PropTypes.number,
  minValue: React.PropTypes.number,
  value: React.PropTypes.number,
  className: React.PropTypes.string,

  // ACTIONS
  onZoomIn: React.PropTypes.func,
  onZoomOut: React.PropTypes.func
};

ZoomControl.defaultProps = {
  orientation: 'horizontal',
  maxValue: 10,
  minValue: 0,
  value: 2
};

export default ZoomControl;
