import React from 'react';

// Components
import Title from 'components/ui/Title';
import Sidebar from 'containers/explore/Sidebar';
import DatasetListHeader from 'containers/explore/DatasetListHeader';
import DatasetList from 'components/explore/DatasetList';
import Paginator from 'components/ui/Paginator';
import Map from 'containers/explore/Map';
import Legend from 'components/ui/Legend';
import CustomSelect from 'components/ui/CustomSelect';
import LayerManager from 'utils/layers/LayerManager';

// Styles
import './style.scss';

const mapConfig = {
  zoom: 3,
  latLng: {
    lat: 0,
    lng: 0
  }
};

const breadcrumbs = [
  {name: 'Home', url: '/'}
];

const sliderSearch = [
  {label: 'a', value: 'a', items: [
    {label: 'aa', value: 'aa'},
    {label: 'ab', value: 'ab'},
    {label: 'ac', value: 'ac'}
  ]},
  {label: 'b', value: 'b', items: [
    {label: 'ba', value: 'ba'},
    {label: 'bb', value: 'bb'},
    {label: 'bc', value: 'bc'}
  ]},
  {label: 'c', value: 'c'}
];

class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layersActive: props.layersActive
    }

    // Bindings
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentWillMount() {
    this.props.getDatasets();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ layersActive: nextProps.layersActive });
  }

  handleRedirect(item) {
    item && item.value && this.props.redirectTo(`explore/${item.value}`);
  }

  render() {
    const { explore, paginatedDatasets } = this.props;
    const datasetsSearchList = explore.datasets.list.map(d => {
      return {
        value: d.id,
        label: d.attributes.name
      }
    });

    return (
      <div className="p-explore">
        <div className="c-page -dark">
          <Sidebar>
            <div className="intro row">
              <div className="column small-12">
                <Title className="-primary -huge">
                  Explore
                </Title>
              </div>
            </div>
            <div className="row collapse">
              <div className="column small-12 medium-6">
                <CustomSelect options={datasetsSearchList} onValueChange={this.handleRedirect} search={true}/>
              </div>
              <div className="column small-12 medium-6">
                <CustomSelect options={sliderSearch} />
              </div>
            </div>

            <DatasetListHeader
              list={explore.datasets.list}
              mode={explore.datasets.mode}
            />
            <DatasetList
              active={explore.datasets.active}
              list={paginatedDatasets}
              mode={explore.datasets.mode}
            />

            <Paginator
              options={{
                page: explore.datasets.page,
                limit: explore.datasets.limit,
                size: explore.datasets.list.length
              }}
              onChange={page => this.props.setDatasetsPage(page)}
            />
          </Sidebar>
          <Map
            LayerManager={LayerManager}
            mapConfig={mapConfig}
            layersActive={this.state.layersActive}
            toggledDataset={this.props.toggledDataset}
          />

        {this.state.layersActive && this.state.layersActive.length &&
          <Legend
            layersActive={this.state.layersActive}
            className={{ color: '-dark' }}
            setDatasetsActive={this.props.setDatasetsActive}
          />
        }
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  // STORE
  explore: React.PropTypes.object,
  paginatedDatasets: React.PropTypes.array,
  layersActive: React.PropTypes.array,
  toggledDataset: React.PropTypes.string,

  // ACTIONS
  getDatasets: React.PropTypes.func,
  setDatasetsPage: React.PropTypes.func
};


export default Explore;
