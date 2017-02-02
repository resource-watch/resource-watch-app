import React from 'react';
import {debounce} from 'lodash';
import * as THREE from 'three';
import orbitControls from 'three-orbit-controls';
import earthImage from './images/earth-min.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import cloudsImage from './images/clouds-min.png';
import './style.scss';

const OrbitControls = orbitControls(THREE);
const imageLoader = new THREE.TextureLoader();
const cloudsMapImage = imageLoader.load(cloudsImage);

class Globe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      texture: props.texture,
      height: props.height,
      width: props.width,
    };
  }

  /**
   * Create canvas and start
   */
  componentDidMount() {
    this.createScene();
    this.creteaEarth();
    this.addHalo();
    this.setTexture();
    this.addLights();
    this.addControls();

    // Start!
    this.draw();

    window.addEventListener('resize', debounce(function onResize() {
      const nextWidth = this.el.clientWidth || this.el.innerWidth;
      const nextHeight = this.el.clientHeight || this.el.innerHeight;
      this.setState({ width: nextWidth, height: nextHeight });
    }.bind(this), 250));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.texture !== this.props.texture) {
      this.setState({ texture: nextProps.texture || null });
    }
    if (nextProps.width !== this.props.width) {
      this.setState({ width: nextProps.width });
    }
    if (nextProps.height !== this.props.height) {
      this.setState({ height: nextProps.height });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.texture !== this.state.texture) {
      this.setTexture();
      this.slideToRight();
    }
    if ((prevState.width !== this.state.width) ||
      (prevState.height !== this.state.height)) {
      this.update();
    }
  }

  /**
   * Method to change layers to earth
   */
  setTexture() {
    const mapImage = this.state.texture ?
      imageLoader.load(this.state.texture) : cloudsMapImage;
    const radius = 50.2;
    const segments = 64;
    const rings = 64;
    if (!this.currentTexture) {
      const geometry = new THREE.SphereGeometry(radius, segments, rings);
      const material = new THREE.MeshBasicMaterial({
        map: mapImage,
        transparent: true,
      });
      this.currentTexture = new THREE.Mesh(geometry, material);
    } else {
      this.currentTexture.material.map = mapImage;
      this.currentTexture.material.needsUpdate = true;
    }
    this.currentTexture.updateMatrix();
    this.scene.add(this.currentTexture);
  }

  slideToRight() {
    if (this.state.texture) {
      this.changePosition(180, 0);
    } else {
      this.resetPosition();
    }
  }

  /**
   * Initialize three.js and create scene, camera and renderer.
   * Then append canvas.
   */
  createScene() {
    if (this.scene) {
      throw new Error('Scene has been created before.');
    }

    const width = this.state.width;
    const height = this.state.height;
    const fov = 75;
    const near = 0.01;
    const far = 1000;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene.add(this.camera);

    this.camera.position.z = 124;

    // Appending canvas
    this.el.appendChild(this.renderer.domElement);

    if (config && config.env !== 'production') {
      this.addStats();
    }
  }

  /**
   * Create and add Earth
   */
  creteaEarth() {
    if (!this.scene) {
      throw new Error('Scene should be created before.');
    }
    const radius = 50;
    const segments = 32;
    const rings = 32;
    const material = new THREE.MeshPhongMaterial({
      map: imageLoader.load(this.props.earthImagePath),
      bumpMap: imageLoader.load(this.props.earthBumpImagePath),
      bumpScale: 0.01,
    });
    const geometry = new THREE.SphereGeometry(radius, segments, rings);
    const earth = new THREE.Mesh(geometry, material);
    earth.updateMatrix();
    this.scene.add(earth);
  }

  addHalo() {
    if (!this.scene) {
      throw new Error('Scene and camera should be created before.');
    }

    const vertexShaderString = `
      varying vec3 vNormal;
      void main()
      {
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `;
    const fragmentShaderString = `
      varying vec3 vNormal;
      void main()
      {
        float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
        gl_FragColor = vec4( 0.32, 0.32, 0.9, 0.7 ) * intensity;
      }
    `;
    const material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: vertexShaderString,
      fragmentShader: fragmentShaderString,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const geometry = new THREE.SphereGeometry(58, 32, 32);
    const halo = new THREE.Mesh(geometry, material);

    this.scene.add(halo);
  }

  /**
   * Add lights to scene
   */
  addLights() {
    if (!this.scene) {
      throw new Error('Scene and camera should be created before.');
    }

    const ambientLight = new THREE.AmbientLight(this.props.ambientLightColor);
    const pointLight = new THREE.PointLight(this.props.pointLightColor, 0.885);
    const x = 400;
    const y = 350;
    const z = 250;

    if (this.props.lightPosition === 'left') {
      pointLight.position.set(-x, y, z);
    } else {
      pointLight.position.set(x, y, z);
    }

    this.scene.add(ambientLight);
    this.camera.add(pointLight);
  }

  /**
   * Add controls
   */
  addControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Configuring controls
    controls.minDistance = 50 + 30;
    controls.maxDistance = 124;
    controls.enableDamping = this.props.enableDamping;
    controls.dampingFactor = this.props.dampingFactor;
    controls.autoRotate = this.props.autorotate;
    controls.enablePan = false;
    controls.enableZoom = this.props.enableZoom;
    controls.zoomSpeed = this.props.zoomSpeed;
    controls.rotateSpeed = this.props.rotateSpeed;
    controls.autoRotateSpeed = this.props.autoRotateSpeed;

    this.controls = controls;
  }

  /**
   * Change globe position
   * @param  {Number} offsetX
   * @param  {Number} offsetY
   */
  changePosition(offsetX, offsetY) {
    const width = this.state.width;
    const height = this.state.height;
    const oX = offsetX ? (width * offsetX * -1) / 1000 : 0;
    const oY = offsetY ? (width * offsetY * -1) / 1000 : 0;

    this.camera.setViewOffset(width, height, oX, oY, width, height);
  }

  /**
   * Reset globe position
   */
  resetPosition() {
    const width = this.state.width;
    const height = this.state.height;

    this.camera.setViewOffset(width, height, 0, 0, width, height);
  }

  /**
   * Add stats
   */
  addStats() {
    const scriptElement = document.createElement('script');
    scriptElement.onload = function onLoad() {
      const stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    scriptElement.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
    document.head.appendChild(scriptElement);
    return this;
  }

  update() {
    this.camera.aspect = this.state.width / this.state.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.state.width, this.state.height);
  }

  /**
   * Draw globe and start animation
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    if (!this.state.texture) {
      this.currentTexture.rotation.y += 0.0002;
    } else if (this.currentTexture.rotation.y !== 0) {
      this.currentTexture.rotation.y = 0;
    }
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * This component will append canvas element inside here.
   */
  render() {
    return (
      <div ref={node => (this.el = node)} className="c-globe" />
    );
  }

}

Globe.defaultProps = {
  // Size
  width: window.innerWidth,
  height: window.innerHeight,

  // Lights
  ambientLightColor: 0x262626,
  pointLightColor: 0xdddddd,
  lightPosition: 'left',

  // Controls
  autorotate: false,
  autoRotateSpeed: 2.0, // It depends on autorotate
  rotateSpeed: 0.25,
  enableZoom: false,
  zoomSpeed: 0.25,
  enableDamping: true, // Set true to enable inertia
  dampingFactor: 0.25,
  radius: 50,

  // Earth textures
  earthImagePath: earthImage,
  earthBumpImagePath: earthBumpImage,
  texture: null,
};

Globe.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  ambientLightColor: React.PropTypes.number,
  pointLightColor: React.PropTypes.number,
  lightPosition: React.PropTypes.string,
  autorotate: React.PropTypes.bool,
  autoRotateSpeed: React.PropTypes.number,
  rotateSpeed: React.PropTypes.number,
  enableZoom: React.PropTypes.bool,
  zoomSpeed: React.PropTypes.number,
  enableDamping: React.PropTypes.bool,
  dampingFactor: React.PropTypes.number,
  earthImagePath: React.PropTypes.string,
  earthBumpImagePath: React.PropTypes.string,
  texture: React.PropTypes.string,
};

export default Globe;
