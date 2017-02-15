import React from 'react';

// Helpers

// Components

// Styles
import './style.scss';

class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getDatasets();
  }

  render() {
    console.log(this.props.paginatedDatasets);
    return (
      <div className="c-page">
        Explore
      </div>
    );
  }
}

Explore.propTypes = {
  // STORE
  explore: React.PropTypes.object,
  paginatedDatasets: React.PropTypes.array,

  // ACTIONS
  getDatasets: React.PropTypes.func
};


export default Explore;
