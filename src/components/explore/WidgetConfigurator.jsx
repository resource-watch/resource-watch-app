import React from 'react';
import Jiminy from 'jiminy';

// Components

import { Field, Select } from 'rw-components';

const chartConfig = [
  {
    name: 'bar',
    acceptedStatTypes: [
      ['nominal'],
      ['ordinal'],
      ['quantitative', 'nominal'],
      ['quantitative', 'temporal'],
      ['quantitative', 'ordinal']
    ]
  },
  {
    name: 'line',
    acceptedStatTypes: [
      ['quantitative', 'temporal'],
      ['quantitative', 'ordinal']
    ]
  },
  {
    name: 'pie',
    acceptedStatTypes: [
      ['nominal'],
      ['ordinal']
    ]
  }
];

class WidgetConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chartOptions: []
    };

    this.jiminy = new Jiminy(this.props.dataset, chartConfig);
    console.info('jiminy created! ');

    // BINDINGS
  }

  componentWillMount() {
    if (this.props.dataset.length) {
      this.getChartOptions();
    }
  }

  onChartTypeChanged(value) {
    console.info('onChartTypeChanged', value);
  }

  getChartOptions() {
    this.setState({
      chartOptions: this.jiminy.recommendation()
    });
  }

  render() {
    console.info('render props ', this.props);
    const { chartOptions } = this.state;
    const chartOptionsValue = chartOptions.length ?
      this.state.chartOptions.map(value => ({ label: value, value }))
      : [{ label: 'Loading', value: 'Loading' }];

    return (
      <div className="c-widget-configurator">
        <Field
          onChange={value => this.onChartTypeChanged(value)}
          options={chartOptionsValue}
          properties={{
            multi: false,
            type: 'text',
            default: '',
            label: 'CHART TYPE'
          }}
        >
          {Select}
        </Field>
      </div>
    );
  }
}

WidgetConfigurator.propTypes = {
  // STATE
  dataset: React.PropTypes.array
  // ACTIONS
};

export default WidgetConfigurator;
