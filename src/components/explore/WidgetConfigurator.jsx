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
      chartTypeOptions: [], // Chart types available
      allColumns: [],
      selected: {
        chartType: '',
        xAxis: '',
        yAxis: ''
      }
    };

    this.jiminy = new Jiminy(this.props.dataset, chartConfig);

    // BINDINGS
  }

  componentWillMount() {
    if (this.props.dataset.length) {
      this.getChartTypeOptions();
    }
  }

  onChartTypeChanged(value) {
    // Retrieve fields description from JSON object
    const chartFieldsSelected = chartFields.find(elem => elem.name === value);
    const allColumnsArray = this.jiminy.columns(chartFieldsSelected.name);
    this.setState({
      selected: {
        chartType: value
      },
      allColumns: allColumnsArray
    });
  }

  getChartTypeOptions() {
    this.setState({
      chartTypeOptions: this.jiminy.recommendation()
    });
  }

  render() {
    const { chartTypeOptions, allColumns } = this.state;
    const selected = this.state.selected;
    const { chartType, xAxis, yAxis } = selected;
    console.info('chartType', chartType);
    console.info('xAxis', xAxis);
    console.info('yAxis', yAxis);

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
        {(chartType !== '') &&
          <div>
            {
              chartFields.find(elem => elem.name === chartType).fields.map(el =>
                <Field
                  onChange={(val) => {
                    switch (el) {
                      case 'X axis':
                        this.setState({ selected: Object.assign(selected, { xAxis: val }) });
                      case 'Y axis':
                        this.setState({ selected: Object.assign(selected, { yAxis: val }) });
                    }
                  }}
                  options={(() => {
                    switch (chartType) {
                      case 'bar':
                        let cols;
                        if (el === 'X axis') {
                          cols = yAxis ? this.jiminy.columns(chartType, yAxis)
                            : allColumns;
                        } else {
                          cols = xAxis ? this.jiminy.columns(chartType, xAxis)
                            : allColumns;
                        }
                        //debugger;
                        return cols.map(col => ({ label: col, value: col }));
                      case 'pie':
                        return this.jiminy.columns(chartType)
                          .map(col => ({ label: col, value: col }));
                      default :
                        return this.jiminy.columns(chartType)
                          .map(col => ({ label: col, value: col }));
                    }
                  })()}
                  properties={{
                    multi: false,
                    type: 'text',
                    label: el
                  }}
                >
                  {Select}
                </Field>
              )
            }
          </div>
        }
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
