import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';

// Styles
import './style.scss';

class DatasetListHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
      list: props.list
    };

    // BINDINGS
    this.triggerSetDatasetMode = this.triggerSetDatasetMode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode,
      list: nextProps.list
    });
  }

  /**
   * UI EVENTS
   * - triggerSetDatasetMode (e)
  */
  triggerSetDatasetMode(e) {
    this.props.setDatasetsMode(e.currentTarget.dataset.mode);
  }

  render() {
    const { mode, list } = this.state;

    return (
      <div className="c-dataset-list-header">
        <div className="total">
          {list.length} datasets
        </div>
        <div className="actions">
          <div className="mode-container">
            <Button
              properties={{
                'data-mode': 'grid',
                className: (mode === 'grid') ? '-active' : ''
              }}
              onClick={this.triggerSetDatasetMode}
            >
              <Icon name="icon-view_grid" className="-medium" />
            </Button>
            <Button
              properties={{
                'data-mode': 'list',
                className: (mode === 'list') ? '-active' : ''
              }}
              onClick={this.triggerSetDatasetMode}
            >
              <Icon name="icon-view_list" className="-medium" />
            </Button>
          </div>
          {/* <div className="filter-container">
            Filters
          </div> */}
        </div>
      </div>
    );
  }
}

DatasetListHeader.propTypes = {
  // STATE
  mode: React.PropTypes.string,
  list: React.PropTypes.array,
  // ACTIONS
  setDatasetsMode: React.PropTypes.func
};

export default DatasetListHeader;
