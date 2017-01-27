/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

export default class LayerGlobeManager {

  // Constructor
  constructor(map, options = {}) {
    this.map = map;
    this.requests = {};
    this.onLayerAddedSuccess = options.onLayerAddedSuccess;
    this.onLayerAddedError = options.onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      cartodb: this.addCartoLayer
    }[layer.provider];

    if (method) method.call(this, layer, opts);
  }

  /**
   * PRIVATE METHODS
   * - addCartoLayer
   */
  addCartoLayer(layer, opts) {
    const options = opts;

    if (this.requests[layer.id]) {
      if (this.requests[layer.id].readyState !== 4) {
        this.requests[layer.id].abort();
        delete this.requests[layer.id];
      }
    }

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', `https://${layer.layerConfig.account}.carto.com/api/v1/map`);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(layer.layerConfig.body));

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const data = JSON.parse(xmlhttp.responseText);
          console.log(data);
        } else {
          console.log('error');
        }
      }
    };

    this.requests[layer.id] = xmlhttp;
  }
}
