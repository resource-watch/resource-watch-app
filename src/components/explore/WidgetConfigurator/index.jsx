import React from 'react';
import Jiminy from 'jiminy';

// Components
import Title from 'components/ui/Title';
import Dropdown from 'components/ui/Dropdown';

// Styles
import './style.scss';

class WidgetConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset
    };

    // BINDINGS
  }

  render() {
    return (
      <div className="c-widget-configurator">
        <Title className="-default">
          CHART TYPE
        </Title>

      </div>
    );
  }
}

WidgetConfigurator.propTypes = {
  // STATE
  dataset: React.PropTypes.object
  // ACTIONS
};

export default WidgetConfigurator;
