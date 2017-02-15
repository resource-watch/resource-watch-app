import React from 'react';
import Icon from 'components/ui/Icon';

import './style.scss';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: true
    };

    this.triggerToggle = this.triggerToggle.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerToggle
  */
  triggerToggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const openedClass = (this.state.opened) ? '-opened' : '';

    return (
      <aside ref={(node) => { this.sidebarNode = node; }} className={`c-sidebar ${openedClass}`}>
        <button type="button" className={`l-sidebar-toggle btn-toggle ${openedClass}`} onClick={this.triggerToggle}>
          {this.state.opened &&
            <Icon className="-little" name="icon-arrow-left" />
          }
          {!this.state.opened &&
            <Icon className="-little" name="icon-arrow-right" />
          }
        </button>

        <div className="sidebar-content">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  children: React.PropTypes.object
};
