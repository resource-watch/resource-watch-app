import React from 'react';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';


// Styles
import './style.scss';

const breadcrumbs = [
  {name: 'Home', url: '/'}
];

class ExploreDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataset: {}
    };
  }

  componentWillMount() {
    this.props.getDataset(this.props.params.id);
  }

  render() {
    console.info(this.props.exploreDetail);

    return (
      <div className="c-page">
        <Breadcrumbs items={breadcrumbs} />
        <Title className="-p`rimary -huge" >Hey!</Title>
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
