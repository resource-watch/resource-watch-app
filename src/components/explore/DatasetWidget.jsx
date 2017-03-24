import React from 'react';

// Components
import Title from 'components/ui/Title';
import Button from 'components/ui/Button';
import DatasetWidgetChart from 'components/explore/DatasetWidgetChart';
import DatasetLayerChart from 'components/explore/DatasetLayerChart';
import DatasetPlaceholderChart from 'components/explore/DatasetPlaceholderChart';
import { Link } from 'react-router';


class DatasetWidget extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: props.active,
      dataset: props.dataset,
      widget: props.widget,
      layer: props.layer,
      hasWidget: !!props.widget,
      hasLayer: !!props.layer,
      mode: props.mode
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
      hasLayer: !!nextProps.layer,
      mode: nextProps.mode
    });
  }

  /**
   * HELPERS
   * - getWidgetOrLayer
   * - getDescription
   * - getButton
  */
  getWidgetOrLayer() {
    if (this.state.hasWidget) { return this.state.widget.attributes; }
    if (this.state.hasLayer) { return this.state.layer.attributes; }
    return null;
  }

  getDescription(_text) {
    let text = _text;
    if (typeof text === 'string' && text.length > 70) {
      text = text.replace(/^(.{70}[^\s]*).*/, '$1');
      return `${text}...`;
    }
    return text;
  }

  getButton() {
    const { active, layer } = this.state;
    const buttonText = (active) ? 'Active' : 'Add to map';
    const buttonClass = (active) ? '-active' : '';

    if (layer) {
      return (
        <Button
          properties={{
            className: `-primary -fullwidth ${buttonClass}`
          }}
          onClick={this.triggerToggleLayer}
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
    this.props.toggleDatasetActive(dataset.id);
  }

  render() {
    const { hasWidget, hasLayer, mode, dataset } = this.state;
    const gridMode = (mode === 'grid');
    const element = this.getWidgetOrLayer();

    return (
      <div className={`c-dataset-list-item -${mode}`}>
        {/* If it has widget we want to renderize the default widget one */}
        {hasWidget && gridMode &&
          <DatasetWidgetChart widget={element} />
        }
        {/* If it doesn't have widget but has layer we want to renderize the default layer one */}
        {!hasWidget && hasLayer && gridMode &&
          <DatasetLayerChart layer={element} />
        }

        {!hasWidget && !hasLayer && gridMode &&
          <DatasetPlaceholderChart />
        }

        <div className="info">
          <div className="detail">
            {/* Title */}
            <Title className="-default -secondary">
              <Link to={`/explore/${dataset.id}`}>
                {dataset.attributes.name}
              </Link>
            </Title>

            {/* Description */}
            {dataset.attributes.description &&
              <p>{this.getDescription(dataset.attributes.description)}</p>
            }

            {/* Source */}
            {dataset.attributes.source &&
              <p>Source: {dataset.attributes.source}</p>
            }
          </div>
          <div className="actions">
            {/* Layer Button */}
            {this.getButton()}
          </div>

        </div>
      </div>
    );
  }
}

DatasetWidget.propTypes = {
  // STATE
  active: React.PropTypes.bool,
  dataset: React.PropTypes.object,
  widget: React.PropTypes.object,
  layer: React.PropTypes.object,
  mode: React.PropTypes.string,
  // ACTIONS
  toggleDatasetActive: React.PropTypes.func
};

export default DatasetWidget;
