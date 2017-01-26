import React from 'react';
import * as THREE from 'three';
import orbitControls from './controls';
import earthImage from './images/earth.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import cloudsImage from './images/clouds.png';
import './style.scss';

const OrbitControls = orbitControls(THREE);
const imageLoader = new THREE.TextureLoader();

class Globe extends React.Component {

  /**
   * Create canvas and start
   */
  componentDidMount() {
    this.createScene();
    this.creteaEarth();
    this.addClouds();
    this.addLights();
    this.addControls();

    // Start!
    this.draw();
  }

  /**
   * Initialize three.js and create scene, camera and renderer.
   * Then append canvas.
   */
  createScene() {
    if (this.scene) {
      throw new Error('Scene has been created before.');
    }

    const width = this.props.width;
    const height = this.props.height;
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
    window.globe = this;

    // Appending canvas
    this.el.appendChild(this.renderer.domElement);
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
      bumpScale: 0.005
    });
    const geometry = new THREE.SphereGeometry(radius, segments, rings);
    const earth = new THREE.Mesh(geometry, material);
    earth.updateMatrix();
    this.scene.add(earth);
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

  addClouds() {
    const material = new THREE.MeshBasicMaterial({
      map: imageLoader.load(cloudsImage),
      transparent: true
    });
    const geometry = new THREE.SphereGeometry(50.1, 64, 64);
    this.clouds = new THREE.Mesh(geometry, material);
    this.clouds.updateMatrix();
    this.scene.add(this.clouds);
  }

  /**
   * Change globe position
   * @param  {Number} offsetX
   * @param  {Number} offsetY
   */
  changePosition(offsetX, offsetY) {
    const width = this.props.width;
    const height = this.props.height;
    const oX = offsetX ? (width * offsetX * -1) / 1000 : 0;
    const oY = offsetY ? (width * offsetY * -1) / 1000 : 0;

    this.camera.setViewOffset(width, height, oX, oY, width, height);
  }

  /**
   * Reset globe position
   */
  resetPosition() {
    const width = this.props.width;
    const height = this.props.height;

    this.camera.setViewOffset(width, height, 0, 0, width, height);
  }

  /**
   * Draw globe and start animation
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    if (this.clouds) {
      this.clouds.rotation.y += 0.0002;
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
  rotateSpeed: 1.0,
  enableZoom: false,
  zoomSpeed: 1.0,
  enableDamping: true, // Set true to enable inertia
  dampingFactor: 0.25,
  radius: 50,

  // Earth textures
  earthImagePath: earthImage,
  earthBumpImagePath: earthBumpImage,
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
};

export default Globe;
