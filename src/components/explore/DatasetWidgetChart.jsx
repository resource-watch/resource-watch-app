import React from 'react';
import VegaChart from 'components/widgets/VegaChart';
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
    const widgetConfig = this.state.widget.widgetConfig;

    return (
      <div className="c-dataset-widget">
        <Spinner
          isLoading={this.state.loading}
          className="-light"
        />
        <VegaChart
          data={widgetConfig}
          toggleLoading={this.triggerToggleLoading}
        />
      </div>
    );
  }
}

DatasetWidgetChart.propTypes = {
  // STATE
  widget: React.PropTypes.object
};

export default DatasetWidgetChart;
