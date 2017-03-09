import React from 'react';

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

  componentWillReceiveProps(nextProps){

  }

  render() {
    const attributes = this.props.exploreDetail.dataset.detail.attributes;

    let titleText = '';

    if (attributes) {
      if (attributes.widget[0]) {
        const widget = attributes.widget[0].attributes;
        console.info('widget', widget);
        titleText = widget.name;
      }

      if (attributes.layer[0]) {
        const layer = attributes.layer[0].attributes;
        console.info('layer', layer);
        titleText = layer.name;
      }
    }

    return (
      <div className="c-page c-page-explore-detail">
        <div className="header">
          <Breadcrumbs items={breadcrumbs} />
          <Title className="-primary -huge" >{titleText}</Title>
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
  getDataset: React.PropTypes.func
};

export default ExploreDetail;
