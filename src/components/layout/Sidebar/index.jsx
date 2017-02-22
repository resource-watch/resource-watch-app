import React from 'react';
import Icon from 'components/ui/Icon';

import './style.scss';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.triggerToggle = this.triggerToggle.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerToggle
  */
  triggerToggle() {
    this.props.setSidebar(!this.props.sidebarOpen);
  }

  render() {
    const openedClass = (this.props.sidebarOpen) ? '-opened' : '';

    return (
      <aside ref={(node) => { this.sidebarNode = node; }} className={`c-sidebar ${openedClass}`}>
        <button type="button" className={`l-sidebar-toggle btn-toggle ${openedClass}`} onClick={this.triggerToggle}>
          {this.props.sidebarOpen &&
            <Icon className="-little" name="icon-arrow-left" />
          }
          {!this.props.sidebarOpen &&
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
  children: React.PropTypes.array
};
