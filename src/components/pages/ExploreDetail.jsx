import React from 'react';
import classNames from 'classnames';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import Dropdown from 'components/ui/Dropdown';
import DatasetList from 'components/explore/DatasetList';
import Spinner from 'components/ui/Spinner';

const breadcrumbs = [
  { name: 'Home', url: '/' }
];

class ExploreDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widgetChartLoading: true,
      configureDropdownActive: false,
      similarDatasetsLoaded: false
    };

    // BINDINGS
    this.triggerToggleWidgetChartLoading = this.triggerToggleWidgetChartLoading.bind(this);
    this.triggerConfigureChart = this.triggerConfigureChart.bind(this);
    this.handleConfigureDropdownChange = this.handleConfigureDropdownChange.bind(this);
  }

  componentWillMount() {
    this.setState({ widgetChartLoading: true });
    this.props.getDataset(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.resetDataset();
      this.setState({ similarDatasetsLoaded: false }, () => {
        this.props.getDataset(this.props.params.id);
      });
    }

    const dataset = nextProps.exploreDetail.dataset.detail.attributes;

    if (dataset) {
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
  }

  componentWillUnmount() {
    this.props.resetDataset();
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

  triggerToggleWidgetChartLoading(loading) {
    this.setState({ widgetChartLoading: loading });
  }

  triggerOpenLayer() {
    console.info('triggerOpenLayer');
  }

  triggerDownload() {
    console.info('triggerDownload');
  }

  triggerConfigureChart(e) {
    // We need to call e.stopPropagation() since otherwise the click would origin
    // the execution of a callback in the Dropdown component that would result in
    // an unexpected behavior.
    e.stopPropagation();
    this.setState({ configureDropdownActive: !this.state.configureDropdownActive });
  }

  handleConfigureDropdownChange(visibility) {
    this.setState({ configureDropdownActive: visibility });
  }

  render() {
    const { exploreDetail } = this.props;

    const dataset = exploreDetail.dataset;
    let hasDataset = false;
    let hasLayer = false;

    if (dataset.detail.attributes) {
      hasDataset = true;
      // hasWidget = dataset.detail.attributes.widget.length > 0;
      hasLayer = dataset.detail.attributes.layer.length > 0;
    }

    const newClassConfigureButton = classNames({
      '-active': this.state.configureDropdownActive
    });

    return (
      <div className="c-page c-page-explore-detail">
        <div className="row">
          <div className="column small-12">
            <Breadcrumbs items={breadcrumbs} />
            <Title className="-primary -huge title" >{ hasDataset &&
                dataset.detail.attributes.name}</Title>
          </div>
        </div>
        <div className="row">
          <div className="column small-12 ">
            <div className="widget-chart">
              <Button
                onClick={this.triggerConfigureChart}
                properties={{ className: newClassConfigureButton }}
              >
                <Icon name="icon-cog" className="-small" />
                CONFIGURE
                <Dropdown
                  className="configure-dropdown"
                  active={this.state.configureDropdownActive}
                  onChangeVisibility={this.handleConfigureDropdownChange}
                />
              </Button>
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
            <p>{ hasDataset &&
                dataset.detail.attributes.description}
            </p>
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
        <div className="row similar-datasets-row">
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
  }
}

ExploreDetail.propTypes = {

  params: React.PropTypes.object,

  // STORE
  exploreDetail: React.PropTypes.object,

  // ACTIONS
  getDataset: React.PropTypes.func,
  resetDataset: React.PropTypes.func,
  getSimilarDatasets: React.PropTypes.func
};

export default ExploreDetail;
