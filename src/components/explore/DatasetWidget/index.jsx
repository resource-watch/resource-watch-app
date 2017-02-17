import React from 'react';

// Components
import Button from 'components/ui/Button';
import DatasetWidgetChart from 'components/explore/DatasetWidgetChart';

// Styles
import './style.scss';

class DatasetWidget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: props.active,
      dataset: props.dataset,
      widget: props.widget,
      layer: props.layer,
      hasWidget: !!props.widget,
      hasLayer: !!props.layer
    };

    // BINDINGS
    this.triggerToggleLayer = this.triggerToggleLayer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active,
      dataset: nextProps.dataset,
      widget: nextProps.widget,
      layer: nextProps.layer,
      hasWidget: !!nextProps.widget,
      hasLayer: !!nextProps.layer
    });
  }

  getWidgetOrLayer() {
    if (this.state.hasWidget) { return this.state.widget.attributes; }
    if (this.state.hasLayer) { return this.state.layer.attributes; }
    return null;
  }

  getButton() {
    const { active, layer } = this.state;
    const buttonText = (active) ? 'Active' : 'Add to map';
    if (layer) {
      return (
        <Button
          properties={{}}
          onClick={this.triggerToggleLayer}
        >
          {buttonText}
        </Button>
      );
    }
    return (
      <Button
        properties={{ disabled: true }}
        onClick={this.triggerToggleLayer}
      >
        Not displayable
      </Button>

    );
  }

  /**
   * UI EVENTS
   * - triggerToggleLayer (e)
  */
  triggerToggleLayer() {
    const { dataset } = this.state;
    this.props.toggleDatasetActive(dataset);
  }

  render() {
    const { hasWidget, hasLayer } = this.state;
    const element = this.getWidgetOrLayer();

    return (
      <div className="c-dataset-list-item">

        {hasWidget &&
          <DatasetWidgetChart widget={element} />
        }
        {!hasWidget && hasLayer &&
          <p>Layer preview</p>
        }

        <div className="list-item-info">
          <h3>{element.name}</h3>

          {/* Layer Button */}
          {this.getButton()}
        </div>
      </div>
    );
  }
}

DatasetWidget.propTypes = {
  // STATE
  active: React.PropTypes.bool,
  dataset: React.PropTypes.string,
  widget: React.PropTypes.object,
  layer: React.PropTypes.object,
  // ACTIONS
  toggleDatasetActive: React.PropTypes.func
};

export default DatasetWidget;
