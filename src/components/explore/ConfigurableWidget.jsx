import React from 'react';
import classNames from 'classnames';
import TetherComponent from 'react-tether';

import WidgetConfigurator from 'components/explore/WidgetConfigurator';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import { getQueryByFilters } from 'rw-components';

class ConfigurableWidget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      configureDropdownActive: false
    };

    // BINDINGS
    this.triggerConfigureChart = this.triggerConfigureChart.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      this.triggerConfigureChart();
    }
  }

  handleSelectionChange(columns) {
    console.info('handleSelectionChange, columns: ', columns);
    const sql = getQueryByFilters()
  }

  triggerConfigureChart() {
    const { configureDropdownActive } = this.state;

    // requestAnimationFrame
    //   - Goal: Prevent double trigger at first atempt
    //   - Issue: When you add the listener the click event is not finished yet
    //            so it will trigger onScreenClick
    //   - Stop propagation?: if I put e.stopPropagation clicking on another
    //                        filter btn won't trigger the screenClick,
    //                        so we will have 2 dropdown filters at the same time
    requestAnimationFrame(() => window[configureDropdownActive ?
      'removeEventListener' : 'addEventListener']('click', this.onScreenClick));

    this.setState({ configureDropdownActive: !configureDropdownActive });
  }

  render() {
    const { configureDropdownActive } = this.state;

    const newClassConfigureButton = classNames({
      '-active': this.state.configureDropdownActive
    });

    return (
      <div className="widget-chart">
        <TetherComponent
          attachment="top right"
          constraints={[{
            to: 'scrollToParent'
          }]}
          targetOffset="0px 100%"
          classes={{
            element: 'c-tooltip -arrow-right'
          }}
        >
          {/* First child: This is what the item will be tethered to */}
          <Button
            onClick={this.triggerConfigureChart}
            properties={{ className: newClassConfigureButton }}
          >
            <Icon name="icon-cog" className="-small" />
            CONFIGURE
          </Button>
          {/* Second child: If present, this item will be tethered to the the first child */}
          { configureDropdownActive &&
            <WidgetConfigurator
              dataset={this.props.dataset}
              onSelectionChange={this.handleSelectionChange}
            />
          }
        </TetherComponent>
      </div>
    );
  }

}

ConfigurableWidget.propTypes = {
  dataset: React.PropTypes.array.isRequired,
  tableName: React.PropTypes.string.isRequired
};

export default ConfigurableWidget;
