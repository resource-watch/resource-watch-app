import React from 'react';
import Jiminy from 'jiminy';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Button from 'components/ui/Button';
import VegaChart from 'components/widgets/VegaChart';
import Spinner from 'components/ui/Spinner';


// Styles
import './style.scss';

const breadcrumbs = [
  { name: 'Home', url: '/' }
];

class ExploreDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: {},
      widgetChartLoading: true
    };

    // BINDINGS
    this.triggerToggleWidgetChartLoading = this.triggerToggleWidgetChartLoading.bind(this);
  }

  componentWillMount() {

    this.setState({ widgetChartLoading: true });

    this.props.getDataset(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.resetDataset();
  }

  triggerToggleWidgetChartLoading(loading) {
    this.setState({ widgetChartLoading: loading });
  }

  triggerOpenLayer() {
    console.info('triggerOpenLayer');
  }

  triggerDownload() {
    console.info('triggerDownload');
  }

  getOpenMapButton(hasLayer) {

    const buttonClass = (hasLayer) ? '-active' : '';

    if (hasLayer) {
      return (
        <Button
          properties={{
            className: `-primary -fullwidth ${buttonClass}`
          }}
          onClick={this.triggerOpenLayer}
        >
          Open in data map
        </Button>
      );
    }
    return (
      <Button
        properties={{
          disabled: true,
          className: '-primary -fullwidth -disabled'
        }}
        onClick={this.triggerToggleLayer}
      >
        Not displayable
      </Button>

    );
  }

  render() {
    const dataset = this.props.exploreDetail.dataset;
    let datasetTitle = '';
    let hasWidget = false;
    let hasLayer = false;
    let hasDataset = false;

    if (dataset.detail.attributes) {
      hasDataset = true;
      hasWidget = dataset.detail.attributes.widget.length > 0;
      hasLayer = dataset.detail.attributes.layer.length > 0;

      datasetTitle = dataset.detail.attributes.name;

      if (hasLayer) {
        const layer = dataset.detail.attributes.layer[0].attributes;
      }
    }

    const drawWidgetChart = () => {
      if (hasWidget) {
        const widget = dataset.detail.attributes.widget[0].attributes;
        const widgetConfig = widget.widgetConfig;
        console.info('widget', widget);
        return (
          <div className="row">
            <div className="column small-12 ">
              <div className="widget-chart">
                <Spinner
                  isLoading={this.state.widgetChartLoading}
                  className="-light"
                />
                <VegaChart
                  data={widgetConfig}
                  toggleLoading={this.triggerToggleWidgetChartLoading}
                />
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

    console.info('dataset', dataset);

    return (
      <div className="c-page c-page-explore-detail">
        <div className="row">
          <div className="column small-12">
            <Breadcrumbs items={breadcrumbs} />
            <Title className="-primary -huge title" >{datasetTitle}</Title>
          </div>
        </div>
        { drawWidgetChart() }
        <div className="row">
          <div className="column small-2">

          </div>
          <div className="column small-7">
            <p>{ hasDataset &&
                dataset.detail.attributes.description}</p>
          </div>
          <div className="column small-3 actions">
            {this.getOpenMapButton(hasLayer)}
            <Button
              properties={{
                disabled: true,
                className: '-primary -fullwidth -disabled'
              }}
              onClick={this.triggerDownload}
              >
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ExploreDetail.propTypes = {

  params: React.PropTypes.object,

  // STORE
  exploreDetail: React.PropTypes.object,

  // ACTIONS
  getDataset: React.PropTypes.func,
  resetDataset: React.PropTypes.func
};

export default ExploreDetail;
