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

const chartFields = [
  {
    name: 'bar',
    fields: ['X axis', 'Y axis']
  },
  {
    name: 'line',
    fields: ['X axis', 'Y axis']
  },
  {
    name: 'pie',
    fields: ['datasource']
  }
];

class WidgetConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chartTypeOptions: [],
      chartDataOptions: null,
      selectedChart: {}
    };

    this.jiminy = new Jiminy(this.props.dataset, chartConfig);

    // BINDINGS
  }

  componentWillMount() {
    if (this.props.dataset.length) {
      this.getChartTypeOptions();
    }
  }

  onChartDataOptionChanged(value, field, chartType) {
    console.info('onChartDataOptionChanged');
    console.info('value', value);
    console.info('field', field);
    console.info('chartType', chartType);

    //this.setState({ selectedChart: { ...object } });

  }

  onChartTypeChanged(value) {
    this.setState({ selectedChart: { name: value } });
    const chartFieldsSelected = chartFields.find(elem => elem.name === value);
    console.info('this.jiminy.columns(chartFieldsSelected.name)', this.jiminy.columns(chartFieldsSelected.name));

    if (chartFieldsSelected) {
      console.info('chartFieldsSelected', chartFieldsSelected);
      const result = (
        <div>
          {
            chartFieldsSelected.fields.map((el) => {

              return (
                <Field
                  onChange={val => this.onChartDataOptionChanged(val, el, value)}
                  options={this.jiminy.columns(chartFieldsSelected.name).map(
                    column => ({ label: column, value: column})
                  )}
                  properties={{
                    multi: false,
                    type: 'text',
                    label: el
                  }}
                >
                  {Select}
                </Field>);
            })
          }
        </div>);

      this.setState({ chartDataOptions: result });
    }
  }

  getChartTypeOptions() {
    this.setState({
      chartTypeOptions: this.jiminy.recommendation()
    });
  }

  renderFields() {
    const selectedChartType = this.chartTypeField;
    console.info('selectedChartType', selectedChartType);
    return (
      <div>
        <p>Hola!</p>
      </div>
    );
  }

  render() {
    console.info('render props ', this.props);
    const { chartTypeOptions } = this.state;
    const chartTypeOptionsValue = chartTypeOptions.length ?
      chartTypeOptions.map(value => ({ label: value, value }))
      : [{ label: 'Loading', value: 'Loading' }];

    return (
      <div className="c-widget-configurator">
        <Field
          onChange={value => this.onChartTypeChanged(value)}
          options={chartTypeOptionsValue}
          properties={{
            multi: false,
            type: 'text',
            default: '',
            label: 'CHART TYPE'
          }}
        >
          {Select}
        </Field>
        {this.state.chartDataOptions}
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
