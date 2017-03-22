import React from 'react';
import classNames from 'classnames';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import DatasetList from 'components/explore/DatasetList';
import Spinner from 'components/ui/Spinner';
import Sidebar from 'containers/explore/Sidebar';
import Map from 'containers/explore/Map';
import Legend from 'components/ui/Legend';
import LayerManager from 'utils/layers/LayerManager';
import Jiminy from 'jiminy';
import TetherComponent from 'react-tether';
import { Field, Select, getQueryByFilters, DatasetService } from 'rw-components';

const breadcrumbs = [
  { name: 'Home', url: '/' }
];

const mapConfig = {
  zoom: 3,
  latLng: {
    lat: 0,
    lng: 0
  }
};

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


class ExploreDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widgetChartLoading: true,
      configureDropdownActive: false,
      similarDatasetsLoaded: false,
      datasetRawDataLoaded: false,
      mapSectionOpened: false,
      chartOptions: [],
      jiminyRecommendationLoaded: false
    };

    // DatasetService
    this.datasetService = new DatasetService(this.props.params.id, {
      apiURL: 'https://api.resourcewatch.org/v1'
    });

    // BINDINGS
    this.triggerConfigureChart = this.triggerConfigureChart.bind(this);
    this.triggerOpenLayer = this.triggerOpenLayer.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillMount() {
    this.setState({ widgetChartLoading: true });
    this.props.getDataset(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.resetDataset();
      this.setState({
        similarDatasetsLoaded: false,
        datasetRawDataLoaded: false
      }, () => {
        this.props.getDataset(this.props.params.id);
      });
    }

    const dataset = nextProps.exploreDetail.dataset.detail.attributes;

    if (dataset) {
      if (dataset.tags) {
        const hasTags = dataset.tags.length > 0;
        if (hasTags) {
          const tags = dataset.tags;
          if (!this.state.similarDatasetsLoaded) {
            this.setState({ similarDatasetsLoaded: true }, () => {
              this.props.getSimilarDatasets(tags);
            });
          }
        }
      }
      if (dataset.tableName && !this.state.datasetRawDataLoaded) {
        this.setState({ datasetRawDataLoaded: true }, () => {
          this.getDatasetRawData(dataset);
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetDataset();
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      this.triggerConfigureChart();
    }
  }

  getDatasetRawData(dataset) {
    console.info('getDatasetRawData', dataset);
    const query = getQueryByFilters(dataset.tableName);
    console.info('query', query);
    this.datasetService.fetchFilteredData(query)
    .then((response) => {
      // console.info('response', response);
      this.jiminy = new Jiminy(response, chartConfig);
      console.info('jiminy created! ');
      const recommendation = this.jiminy.recommendation();
      console.info('jiminy recommendation: ', recommendation);
      // console.info('jiminy columns', this.jiminy.columns(["bar"]));
      this.setState({
        chartOptions: recommendation,
        jiminyRecommendationLoaded: true
      });
    },
    (error) => {
      console.info('error', error);
    }
    );
  }

  getOpenMapButton() {
    const { mapSectionOpened } = this.state;
    const { dataset } = this.props.exploreDetail;
    const hasDefaultLayer = !!dataset.detail.attributes.layer.find(
      value => value.attributes.default === true);
    const buttonText = (mapSectionOpened) ? 'Active' : 'Open in data map';
    const buttonClass = classNames({
      '-active': hasDefaultLayer,
      '-primary': true,
      '-fullwidth': true
    });

    if (hasDefaultLayer) {
      return (
        <Button
          properties={{
            className: buttonClass
          }}
          onClick={this.triggerOpenLayer}
        >
          {buttonText}
        </Button>
      );
    }
    return (
      <Button
        properties={{
          disabled: true,
          className: '-primary -fullwidth -disabled'
        }}
      >
        Not displayable
      </Button>

    );
  }

  triggerOpenLayer() {
    const { dataset } = this.props.exploreDetail;

    this.setState(
      {
        mapSectionOpened: !this.state.mapSectionOpened
      }
    );

    const defaultLayerId = dataset.detail.attributes.layer.find(
      value => value.attributes.default === true).attributes.id;

    this.props.toggleLayerShown(defaultLayerId);
  }

  triggerDownload(){
    console.info('triggerDownload');
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
    const { exploreDetail } = this.props;
    const { dataset } = exploreDetail;
    const { layersShown } = this.props;
    const { configureDropdownActive } = this.state;

    const newClassConfigureButton = classNames({
      '-active': this.state.configureDropdownActive
    });

    const similarDatasetsSectionClass = classNames({
      row: true,
      'similar-datasets-row': true,
      '-active': exploreDetail.similarDatasets.list.filter(value =>
                  value.id !== this.props.params.id
                ).length > 0
    });

    const chartOptions = this.state.chartOptions.length ?
      this.state.chartOptions.map(value => ({ label: value, value }))
      : [{ label: 'Loading', value: 'Loading' }];

    const pageStructure = (
      <div className="c-page c-page-explore-detail">
        <div className="row">
          <div className="column small-12">
            <Breadcrumbs items={breadcrumbs} />
            <Title className="-primary -huge title" >{ dataset.detail.attributes &&
                dataset.detail.attributes.name}</Title>
          </div>
        </div>
        <div className="row">
          <div className="column small-12 ">
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
                  <div>
                    <h3>Configure Chart</h3>
                    <Spinner
                      isLoading={!this.state.jiminyRecommendationLoaded}
                      className="-fixed -light"
                    />
                    <Field
                      onChange={value => console.info(value)}
                      options={chartOptions}
                      properties={{
                        multi: false,
                        type: 'text',
                        default: ''
                      }}
                    >
                      {Select}
                    </Field>
                  </div>
                }
              </TetherComponent>
            </div>
            <Spinner
              isLoading={exploreDetail.dataset.loading}
              className="-fixed -light"
            />
          </div>
        </div>
        <div className="row description-row">
          <div className="column small-2 social" >
            <Icon name="icon-twitter" className="-small" />
            <Icon name="icon-facebook" className="-small" />
          </div>
          <div className="column small-7">
            <p>{ dataset.detail.attributes &&
                dataset.detail.attributes.description}
            </p>
          </div>
          <div className="column small-3 actions">
            {this.getOpenMapButton()}
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
        <div className={similarDatasetsSectionClass} >
          <div className="column small-12">
            <Title className="-secondary title">
              Similar datasets
            </Title>
          </div>
          <div className="column small-12">
            <DatasetList
              active={exploreDetail.similarDatasets.list.map(value => value.id)}
              list={exploreDetail.similarDatasets.list.filter(value =>
                value.id !== this.props.params.id
              )}
              mode="grid"
            />
            <Spinner
              isLoading={exploreDetail.similarDatasets.loading}
              className="-relative"
            />
          </div>
        </div>
      </div>
    );

    if (!this.state.mapSectionOpened) {
      return (
        <div className="c-page c-page-explore-detail">
          {pageStructure}
        </div>
      );
    } else {
      return (
        <div className="c-page c-page-explore-detail">
          <Sidebar>
            {pageStructure}
          </Sidebar>
          <Map
            LayerManager={LayerManager}
            mapConfig={mapConfig}
            layersActive={layersShown}
          />
          <Legend
            layersActive={layersShown}
            className={{ color: '-dark' }}
          />
        </div>
      );
    }
  }
}

ExploreDetail.propTypes = {

  params: React.PropTypes.object,
  layersShown: React.PropTypes.array,

  // STORE
  exploreDetail: React.PropTypes.object,

  // ACTIONS
  getDataset: React.PropTypes.func,
  resetDataset: React.PropTypes.func,
  getSimilarDatasets: React.PropTypes.func,
  toggleLayerShown: React.PropTypes.func
};

export default ExploreDetail;
