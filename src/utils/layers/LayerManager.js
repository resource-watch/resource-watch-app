/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import 'whatwg-fetch';
import L from 'leaflet/dist/leaflet';
// import esri from 'esri-leaflet';

(function(window,undefined){L.Util.ajax=function(url,success,error){window.XMLHttpRequest===undefined&&(window.XMLHttpRequest=function(){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){throw Error("XMLHttpRequest is not supported")}});var response,request=new XMLHttpRequest;return request.open("GET",url),request.onreadystatechange=function(){request.readyState===4&&(request.status===200?(window.JSON?response=JSON.parse(request.responseText):response=eval("("+request.responseText+")"),success(response)):request.status!==0&&error!==undefined&&error(request.status))},request.ontimeout=function(){error("timeout")},request.send(),request},L.UtfGrid=(L.Layer||L.Class).extend({includes:L.Mixin.Events,options:{subdomains:"abc",minZoom:0,maxZoom:18,tileSize:256,resolution:4,useJsonP:!0,pointerCursor:!0,maxRequests:4,requestTimeout:6e4},_mouseOn:null,initialize:function(e,t){L.Util.setOptions(this,t),this._requests={},this._request_queue=[],this._requests_in_process=[],this._url=e,this._cache={};var n=0;while(window["lu"+n])n++;this._windowKey="lu"+n,window[this._windowKey]={};var r=this.options.subdomains;typeof this.options.subdomains=="string"&&(this.options.subdomains=r.split(""))},onAdd:function(e){this._map=e,this._container=this._map._container,this._update();var t=this._map.getZoom();if(t>this.options.maxZoom||t<this.options.minZoom)return;e.on("click",this._click,this),e.on("mousemove",this._move,this),e.on("moveend",this._update,this)},onRemove:function(){var e=this._map;e.off("click",this._click,this),e.off("mousemove",this._move,this),e.off("moveend",this._update,this),this.options.pointerCursor&&(this._container.style.cursor="")},setUrl:function(e,t){return this._url=e,t||this.redraw(),this},redraw:function(){this._request_queue=[];for(var e in this._requests)this._requests.hasOwnProperty(e)&&this._abort_request(e);this._cache={},this._update()},_click:function(e){this.fire("click",this._objectForEvent(e))},_move:function(e){var t=this._objectForEvent(e);t.data!==this._mouseOn?(this._mouseOn&&(this.fire("mouseout",{latlng:e.latlng,data:this._mouseOn}),this.options.pointerCursor&&(this._container.style.cursor="")),t.data&&(this.fire("mouseover",t),this.options.pointerCursor&&(this._container.style.cursor="pointer")),this._mouseOn=t.data):t.data&&this.fire("mousemove",t)},_objectForEvent:function(e){var t=this._map,n=t.project(e.latlng),r=this.options.tileSize,i=this.options.resolution,s=Math.floor(n.x/r),o=Math.floor(n.y/r),u=Math.floor((n.x-s*r)/i),a=Math.floor((n.y-o*r)/i),f=t.options.crs.scale(t.getZoom())/r;s=(s+f)%f,o=(o+f)%f;var l=this._cache[t.getZoom()+"_"+s+"_"+o],c=null;if(l&&l.grid){var h=this._utfDecode(l.grid[a].charCodeAt(u)),p=l.keys[h];l.data.hasOwnProperty(p)&&(c=l.data[p])}return L.extend({latlng:e.latlng,data:c},e)},_update:function(){var e=this._map.getPixelBounds(),t=this._map.getZoom(),n=this.options.tileSize;if(t>this.options.maxZoom||t<this.options.minZoom)return;var r=new L.Point(Math.floor(e.min.x/n),Math.floor(e.min.y/n)),i=new L.Point(Math.floor(e.max.x/n),Math.floor(e.max.y/n)),s=this._map.options.crs.scale(t)/n,o=[];for(var u=r.x;u<=i.x;u++)for(var a=r.y;a<=i.y;a++){var f=(u+s)%s,l=(a+s)%s,c=t+"_"+f+"_"+l;o.push(c),this._cache.hasOwnProperty(c)||(this._cache[c]=null,this.options.useJsonP?this._loadTileP(t,f,l):this._loadTile(t,f,l))}for(var h in this._requests)o.indexOf(h)<0&&this._abort_request(h)},_loadTileP:function(e,t,n){var r=document.getElementsByTagName("head")[0],i=e+"_"+t+"_"+n,s="lu_"+i,o=this._windowKey,u=this,a=L.Util.template(this._url,L.Util.extend({s:L.TileLayer.prototype._getSubdomain.call(this,{x:t,y:n}),z:e,x:t,y:n,cb:o+"."+s},this.options)),f=document.createElement("script");f.setAttribute("type","text/javascript"),f.setAttribute("src",a),window[o][s]=function(e){u._cache[i]=e,delete window[o][s],r.removeChild(f),u._finish_request(i)},this._queue_request(i,a,function(){return r.appendChild(f),{abort:function(){r.removeChild(f)}}})},_loadTile:function(e,t,n){var r=L.Util.template(this._url,L.Util.extend({s:L.TileLayer.prototype._getSubdomain.call(this,{x:t,y:n}),z:e,x:t,y:n},this.options)),i=e+"_"+t+"_"+n;this._queue_request(i,r,this._ajaxRequestFactory(i,r))},_ajaxRequestFactory:function(e,t){var n=this._successCallbackFactory(e),r=this._errorCallbackFactory(t);return function(){var e=L.Util.ajax(t,n,r);return e.timeout=this.options.requestTimeout,e}.bind(this)},_successCallbackFactory:function(e){return function(t){this._cache[e]=t,this._finish_request(e)}.bind(this)},_errorCallbackFactory:function(e){return function(t){this.fire("tileerror",{url:e,code:t})}.bind(this)},_queue_request:function(e,t,n){this._requests[e]={callback:n,timeout:null,handler:null,url:t},this._request_queue.push(e),this._process_queued_requests()},_finish_request:function(e){var t=this._requests_in_process.indexOf(e);t>=0&&this._requests_in_process.splice(t,1),t=this._request_queue.indexOf(e),t>=0&&this._request_queue.splice(t,1),this._requests[e]&&(this._requests[e].timeout&&window.clearTimeout(this._requests[e].timeout),delete this._requests[e]),this._process_queued_requests(),this._requests_in_process.length===0&&this.fire("load")},_abort_request:function(e){this._requests[e]&&this._requests[e].handler&&typeof this._requests[e].handler.abort=="function"&&this._requests[e].handler.abort(),this._cache[e]===null&&delete this._cache[e],this._finish_request(e)},_process_queued_requests:function(){while(this._request_queue.length>0&&(this.options.maxRequests===0||this._requests_in_process.length<this.options.maxRequests))this._process_request(this._request_queue.pop())},_process_request:function(e){this._requests_in_process.push(e);var t=this._requests[e].callback();if(this._requests[e]){this._requests[e].handler=t;if(t.timeout===undefined){var n=this._timeoutCallbackFactory(e);this._requests[e].timeout=window.setTimeout(n,this.options.requestTimeout)}}},_timeoutCallbackFactory:function(e){var t=this._requests[e].url;return function(){this.fire("tileerror",{url:t,code:"timeout"}),this._abort_request(e)}.bind(this)},_utfDecode:function(e){return e>=93&&e--,e>=35&&e--,e-32}}),L.utfGrid=function(e,t){return new L.UtfGrid(e,t)}})(window);

// adding support for esri
// L.esri = esri;

export default class LayerManager {

  // Constructor
  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._layersLoading = {};
    this._rejectLayersLoading = false;
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      leaflet: this._addLeafletLayer,
      arcgis: this._addEsriLayer,
      cartodb: this._addCartoLayer
    }[layer.provider];

    method && method.call(this, layer, opts);
    this._execCallback()
      .then(() => {
        this._onLayerAddedSuccess && this._onLayerAddedSuccess();
      })
      .catch(() => {
        this._layersLoading = {};
        this._rejectLayersLoading = false;
        this._onLayerAddedError && this._onLayerAddedError();
      });
  }

  removeLayer(layerId) {
    if (this._mapLayers[layerId]) {
      this._map.removeLayer(this._mapLayers[layerId]);
      delete this._mapLayers[layerId];
    }
  }

  removeLayers() {
    Object.keys(this._mapLayers).forEach((id) => {
      if (this._mapLayers[id]) {
        this._map.removeLayer(this._mapLayers[id]);
        delete this._mapLayers[id];
      }
    });
    this._layersLoading = {};
  }

  /*
    Private methods
  */
  _execCallback() {
    return new Promise((resolve, reject) => {
      const loop = () => {
        if (!Object.keys(this._layersLoading).length) return resolve();
        if (this._rejectLayersLoading) return reject();
        setTimeout(loop);
      };
      setTimeout(loop);
    });
  }

  _addLeafletLayer(layerSpec, { zIndex }) {
    const layerData = layerSpec.layerConfig;

    let layer;

    layerData.id = layerSpec.id;
    this._layersLoading[layerData.id] = true;

    // Transforming data layer
    // TODO: improve this
    if (layerData.body.crs && L.CRS[layerData.body.crs]) {
      layerData.body.crs = L.CRS[layerData.body.crs.replace(':', '')];
      layerData.body.pane = 'tilePane';
    }

    switch (layerData.type) {
      case 'wms':
        layer = new L.tileLayer.wms(layerData.url, layerData.body); // eslint-disable-line
        break;
      case 'tileLayer':
        if (layerData.body.indexOf('style: "function') >= 0) {
          layerData.body.style = eval(`(${layerData.body.style})`); // eslint-disable-line
        }
        layer = new L.tileLayer(layerData.url, layerData.body); // eslint-disable-line
        break;
      default:
        delete this._layersLoading[layerData.id];
        throw new Error('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      const eventName = (layerData.type === 'wms' ||
      layerData.type === 'tileLayer') ? 'tileload' : 'load';
      layer.on(eventName, () => {
        delete this._layersLoading[layerData.id];
      });
      if (zIndex) {
        layer.setZIndex(zIndex);
      }
      this._mapLayers[layerData.id] = layer;
    }
  }

  _addEsriLayer(layerSpec, { zIndex }) {
    const layer = layerSpec.layerConfig;
    layer.id = layerSpec.id;

    this._layersLoading[layer.id] = true;
    // Transforming layer
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"use-cors"/g, '"useCors"');

    if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
      layerConfig.pane = 'tilePane';
      if (layerConfig.style &&
        layerConfig.style.indexOf('function') >= 0) {
        layerConfig.style = eval(`(${layerConfig.style})`); // eslint-disable-line
      }
      const newLayer = L.esri[layer.type](layerConfig);

      newLayer.on('load', () => {
        delete this._layersLoading[layer.id];
        const layerElement = this._map.getPane('tilePane').lastChild;
        if (zIndex) {
          layerElement.style.zIndex = zIndex;
        }
        layerElement.id = layer.id;
      });
      newLayer.addTo(this._map);
      this._mapLayers[layer.id] = newLayer;
    } else {
      this._rejectLayersLoading = true;
      throw new Error('"type" specified in layer spec doesn`t exist');
    }
  }

  _addCartoLayer(layerSpec, opts) {
    const layer = Object.assign({}, layerSpec.layerConfig, {
      id: layerSpec.id,
      order: layerSpec.order
    });
    const options = opts;

    this._layersLoading[layer.id] = true;

    layer.body.layers.map(val => val.options.interactivity = ['cartodb_id']);
    console.info('1 layer.body.layers', layer.body.layers);

    const layerTpl = {
      version: '1.3.0',
      stat_tag: 'API',
      layers: layer.body.layers
    };
    const params = `?stat_tag=API&config=${encodeURIComponent(JSON.stringify(layerTpl))}`;

    fetch(`https://${layer.account}.carto.com/api/v1/map${params}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const tileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
        const gridJsonTileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.grid.json?callback={cb}`;

        const layerGroup = L.layerGroup().addTo(this._map);
        const tileLayer = L.tileLayer(tileUrl).addTo(layerGroup).setZIndex(layer.order);
        const utfGrid = L.utfGrid(gridJsonTileUrl);
        utfGrid.on('mouseover', (e) => {
          console.info('mouseover', e);
        });
        utfGrid.on('click', (e) => {
          console.info('click', e);
        });
        utfGrid.addTo(this._map);

        this._mapLayers[layer.id] = layerGroup;

        //this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(layer.order);

        this._mapLayers[layer.id].on('load', () => {
          delete this._layersLoading[layer.id];
        });
        this._mapLayers[layer.id].on('tileerror', () => {
          this._rejectLayersLoading = true;
        });
      })
      .then((err) => {
        this._rejectLayersLoading = true;
      });
  }

  setZIndex(layersActive) {
    Object.keys(this._mapLayers).forEach(key => {
      const order = layersActive.filter(l => l.id === key)[0].order;
      this._mapLayers[key].setZIndex(order);
    });
  }
}
