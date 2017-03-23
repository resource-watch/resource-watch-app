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
import ConfigurableWidget from 'components/explore/ConfigurableWidget';
import { DatasetService, getQueryByFilters } from 'rw-components';

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

class ExploreDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      similarDatasetsLoaded: false,
      datasetRawDataLoaded: false,
      datasetData: null,
      mapSectionOpened: false
    };

    // DatasetService
    this.datasetService = new DatasetService(this.props.params.id, {
      apiURL: 'https://api.resourcewatch.org/v1'
    });

    // BINDINGS
    this.triggerOpenLayer = this.triggerOpenLayer.bind(this);
  }

  componentWillMount() {
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
        this.getDatasetRawData(dataset);
      }
    }
  }

  componentWillUnmount() {
    this.props.resetDataset();
  }

  getDatasetRawData(dataset) {
    const query = getQueryByFilters(dataset.tableName) + ' LIMIT 10'; // temporal fix
    console.info('query', query);
    this.datasetService.fetchFilteredData(query)
      .then((response) => {
        this.setState({
          datasetRawDataLoaded: true,
          datasetData: response
        });
      })
      .catch((error) => {
        console.info('error', error);
      });
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

  triggerDownload() {
    console.info('triggerDownload');
  }

  render() {
    const { exploreDetail } = this.props;
    const { dataset } = exploreDetail;
    const { layersShown } = this.props;
    const { datasetData } = this.state;

    console.info('dataset', dataset);

    const similarDatasetsSectionClass = classNames({
      row: true,
      'similar-datasets-row': true,
      '-active': exploreDetail.similarDatasets.list.filter(value =>
                  value.id !== this.props.params.id
                ).length > 0
    });

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
            {this.state.datasetRawDataLoaded &&
              <ConfigurableWidget
                dataset={dataset.detail}
                datasetData={datasetData}
              />
            }
            <Spinner
              isLoading={!this.state.datasetRawDataLoaded}
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
