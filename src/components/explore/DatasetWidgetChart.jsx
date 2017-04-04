import React from 'react';
import VegaChart from 'containers/widgets/VegaChart';
import Title from 'components/ui/Title';
import Spinner from 'components/ui/Spinner';

class DatasetWidgetChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widget: props.widget,
      loading: false
    };

    // BINDINGS
    this.triggerToggleLoading = this.triggerToggleLoading.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      widget: nextProps.widget
    });
  }

  triggerToggleLoading(loading) {
    this.setState({ loading });
  }

  render() {
    const { name, widgetConfig } = this.state.widget;

    return (
      <div className="c-widget-chart">
        <Spinner
          isLoading={this.state.loading}
          className="-light"
        />
        <VegaChart
          data={widgetConfig}
          toggleLoading={this.triggerToggleLoading}
        />
        <Title className="-small -center">
          {name}
        </Title>

      </div>
    );
  }
}

DatasetWidgetChart.propTypes = {
  // STATE
  widget: React.PropTypes.object
};

export default DatasetWidgetChart;
