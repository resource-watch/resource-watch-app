import React from 'react';
import * as d3 from 'd3';
import vega from 'vega';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

const VegaTooltipContent = props => (
  <div>
    <div>{props.item && props.item.x}</div>
    <div>{props.item && props.item.y}</div>
  </div>
);

class VegaChart extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerResize = debounce(this.triggerResize.bind(this), 250);
  }

  componentDidMount() {
    this.mounted = true;
    this.renderChart();
    window.addEventListener('resize', this.triggerResize);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    // We should check if the data has changed
    this.renderChart();
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('resize', this.triggerResize);
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

    const data = Object.assign({}, this.props.data, size, {
      signals: [{
        name: 'onMousemove',
        streams: [{
          type: 'mousemove',
          expr: 'eventX()',
          scale: {
            name: 'x',
            invert: true
          }
        }]
      }]
    });

    if (this.mounted && this.props.toggleLoading) this.props.toggleLoading(true);

    vega.parse.spec(data, {}, (err, chart) => {
      if (this.mounted && this.props.toggleLoading) this.props.toggleLoading(false);
      if (!err && this.mounted) {
        const vis = chart({
          el: this.chart,
          renderer: 'svg'
        });

        vis.update();

        vis.onSignal('onMousemove', (event, x) => {
          const visData = vis.data().table;
          let item;

          if (typeof x === 'string') {
            item = visData.find(d => d.x === x);
          }

          if (typeof x === 'number') {
            const bisectDate = d3.bisector(d => d.x).left;
            const i = bisectDate(visData, x, 1);
            item = visData[i];
          }

          if (item) {
            return this.props.toggleTooltip(true, {
              follow: true,
              children: VegaTooltipContent,
              childrenProps: {
                event, item
              }
            });
          }

          return this.props.toggleTooltip(false);
        });

        // vis.onSignal('onMouseout', () => {
        //   this.props.toggleTooltip(false);
        // });
      }
    });
  }

  triggerResize() {
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
  toggleLoading: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func
};

export default VegaChart;
