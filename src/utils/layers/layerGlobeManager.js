/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import { substitution } from 'utils/utils';

export default class LayerGlobeManager {

  // Constructor
  constructor(map, options = {}) {
    this.map = map;
    this.requests = {};
    this.options = {};
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      cartodb: this.addCartoLayer
    }[layer.provider];

    return method && method.call(this, layer, opts);
  }

  /**
   * PRIVATE METHODS
   * - addCartoLayer
   */
  addCartoLayer(layer, opts) {
    if (this.requests[layer.id]) {
      if (this.requests[layer.id].readyState !== 4) {
        this.requests[layer.id].abort();
        delete this.requests[layer.id];
        delete this.options[layer.id];
      }
    }

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', `https://${layer.layerConfig.account}.carto.com/api/v1/map`);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(layer.layerConfig.body));

    this.requests[layer.id] = xmlhttp;
    this.options[layer.id] = opts;

    xmlhttp.onreadystatechange = function onStateChange() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const data = JSON.parse(xmlhttp.responseText);
          const { layerConfig, staticImageConfig } = layer;

          const texture = substitution(staticImageConfig.urlTemplate, [{
            key: 'account',
            value: layerConfig.account
          }, {
            key: 'token_groupid',
            value: data.layergroupid
          }, {
            key: 'bbox',
            value: staticImageConfig.bbox.join(',')
          }, {
            key: 'format',
            value: staticImageConfig.format
          }, {
            key: 'width',
            value: staticImageConfig.width
          }, {
            key: 'height',
            value: staticImageConfig.height
          }, {
            key: 'srs',
            value: staticImageConfig.srs
          }]);
          this.options[layer.id].onLayerAddedSuccess(texture);
        } else {
          console.log('error');
          this.options[layer.id].onLayerAddedError('error');
        }
      }
    }.bind(this);
  }
}
