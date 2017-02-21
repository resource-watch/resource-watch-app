import React from 'react';
import find from 'lodash/find';

// Components
import DatasetWidget from 'containers/explore/DatasetWidget';

// Styles
import './style.scss';

class DatasetList extends React.Component {
  render() {
    const { active, list } = this.props;
    return (
      <div className="c-dataset-list">
        <div className="list">
          {list.map(dataset =>
            <div className="list-item" key={dataset.id}>
              <DatasetWidget
                active={active.includes(dataset.id)}
                dataset={dataset.id}
                widget={find(dataset.attributes.widget, { attributes: { default: true } })}
                layer={find(dataset.attributes.layer, { attributes: { default: true } })}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

DatasetList.propTypes = {
  list: React.PropTypes.array,
  active: React.PropTypes.array
};

export default DatasetList;
