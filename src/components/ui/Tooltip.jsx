import React from 'react';
import { Spinner } from 'rw-components';
import TetherComponent from 'react-tether';

export default class Tooltip extends React.Component {

  constructor(props) {
    super(props);

    // Bindings
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentWillReceiveProps({ tooltip }) {
    if (tooltip.follow && tooltip.follow !== this.props.tooltip.follow) {
      document.addEventListener('mousemove', this.onMouseMove);
    }
    const stopFollowing = tooltip.follow === false && tooltip.follow !== this.props.tooltip.follow;
    const isEmpty = !tooltip.opened && tooltip.opened !== this.props.tooltip.opened;
    if (stopFollowing || isEmpty) {
      document.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseMove({ clientX, clientY }) {
    this.props.setTooltipPosition({ x: clientX, y: clientY });
    this.clientX = clientX;
    this.clientY = clientY;
  }

  getContent() {
    return this.props.tooltip.children ?
      <this.props.tooltip.children {...this.props.tooltip.childrenProps} /> : null;
  }

  getStyles() {
    const topPos = this.props.tooltip.position.y;
    const bottomPos = this.props.tooltip.position.x;
    if (this.el) {
      // TODO: modify topPos and bottomPos for recalculating toooltip position if it is out of viewport
    }
    return {
      position: 'fixed',
      top: `${topPos}px`,
      left: `${bottomPos}px`
    };
  }

  render() {
    return (
      <TetherComponent
        attachment="top center"
      >
        <div
          className="c-tooltip-global tooltip-content"
          style={this.getStyles()}
        />
        <div
          ref={(node) => { this.el = node; }}
          className={`c-tooltip-global ${this.props.tooltip.opened ? '' : '-hidden'}`}
        >
          {this.getContent()}
        </div>

      </TetherComponent>
    );
  }
}

Tooltip.propTypes = {
  // STORE
  tooltip: React.PropTypes.object,
  setTooltipPosition: React.PropTypes.func
};
