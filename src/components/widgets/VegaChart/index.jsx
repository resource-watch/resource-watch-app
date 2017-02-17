import React from 'react';
import vega from 'vega';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import './style.scss';

class VegaChart extends React.Component {

  componentDidMount() {
    this.resizeEvent = () => {
      this.handleResize();
    };
    window.addEventListener('resize', debounce(this.resizeEvent, 100));

    this.renderChart();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    // We should check if the data has changed
    this.renderChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  setSize() {
    if (this.chart) {
      this.width = this.chart.offsetWidth;
      this.height = this.chart.offsetHeight;
    }
  }

  parseVega() {
    const padding = this.props.data.padding || { top: 20, right: 20, bottom: 20, left: 20 };
    const size = {
      width: this.width - padding.left - padding.right,
      height: this.height - padding.top - padding.bottom
    };

    const data = Object.assign({}, this.props.data, size);

    this.props.toggleLoading(true);
    console.log('hello');
    vega.parse.spec(data, {}, (err, chart) => {
      this.props.toggleLoading(false);
      if (!err) {
        this.vis = chart({
          el: this.chart,
          renderer: 'svg'
        });
        this.vis.update();
      }
    });
  }

  handleResize() {
    this.renderChart();
  }

  renderChart() {
    this.setSize();
    this.parseVega();
  }

  render() {
    return (
      <div className="c-chart">
        <div ref={(c) => { this.chart = c; }} className="chart" />
      </div>
    );
  }
}

VegaChart.propTypes = {
  // Define the chart data
  data: React.PropTypes.object,
  toggleLoading: React.PropTypes.func
};

export default VegaChart;
