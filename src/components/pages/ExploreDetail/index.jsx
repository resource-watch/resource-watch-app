import React from 'react';
import Jiminy from 'jiminy';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';


// Styles
import './style.scss';

const breadcrumbs = [
  { name: 'Home', url: '/' }
];

class ExploreDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: {}
    };
  }

  componentWillMount() {
    // temporal fix to clear the fields

    this.props.getDataset(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.resetDataset();
  }

  render() {
    const dataset = this.props.exploreDetail.dataset;
    let datasetTitle = '';

    if (dataset.detail.attributes) {

      datasetTitle = dataset.detail.attributes.name;

      if (dataset.detail.attributes.widget.length > 0) {
        const widget = dataset.detail.attributes.widget[0].attributes;
      }

      if (dataset.detail.attributes.layer.length > 0) {
        const layer = dataset.detail.attributes.layer[0].attributes;
      }
    }

    return (
      <div className="c-page c-page-explore-detail">
        <div className="row">
          <div className="column small-1 medium-2" />
          <div className="column small-10 medium-8">
            <Breadcrumbs items={breadcrumbs} />
            <Title className="-primary -huge title" >{datasetTitle}</Title>
          </div>
          <div className="column small-1 medium-2" />
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
