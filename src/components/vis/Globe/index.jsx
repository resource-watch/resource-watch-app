import React from 'react';
import * as THREE from 'three';
import orbitControl from './control';
import earthImage from './images/earth-low.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import cloudsImage from './images/clouds-low.png';
import './style.scss';

const Control = orbitControl(THREE);

class Globe extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   * Create canvas and start globe here
   */
  componentDidMount() {
    this.createScene();
    this.addEarth();
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
    const width = this.props.width;
    const height = this.props.height;
    const fov = 75;
    const near = 1;
    const far = 1000;

    this.scene = new THREE.Scene();
    this.imageLoader = new THREE.TextureLoader();
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.camera.position.z = far;

    this.renderer.setSize(width, height);
    this.scene.add(this.camera);

    // Appending canvas
    this.el.appendChild(this.renderer.domElement);
  }

  /**
   * Add lights to scene
   */
  addLights() {
    const ambientLight = new THREE.AmbientLight(0x444444); // Soft white light
    this.pointLight = new THREE.PointLight(0xcccccc, 1);

    this.pointLight.position.set(this.props.width / 2, this.props.height / 2, 500);

    this.scene.add(ambientLight);
    this.camera.add(this.pointLight);
  }

  /**
   * Add earth sphere
   */
  addEarth() {
    const material = new THREE.MeshPhongMaterial({
      map: this.imageLoader.load(this.props.earthImage),
      bumpMap: this.imageLoader.load(this.props.earthBumpImage),
      bumpScale: 5
    });
    const geometry = new THREE.SphereGeometry(this.props.radius, 32, 32);
    this.earth = new THREE.Mesh(geometry, material);
    this.earth.updateMatrix();
    this.scene.add(this.earth);
  }

  /**
   * Add controls
   */
  addControls() {
    this.control = new Control(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.control.dampingFactor = 0.1;
    this.control.autoRotate = this.props.autorotate;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.rotateSpeed = this.props.velocity;
    this.control.autoRotateSpeed = this.props.velocity;
  }

  addClouds() {
    const material = new THREE.MeshBasicMaterial({
      map: this.imageLoader.load(cloudsImage),
      transparent: true
    });
    const geometry = new THREE.SphereGeometry(this.props.radius + 1, 64, 64);
    this.clouds = new THREE.Mesh(geometry, material);
    this.clouds.updateMatrix();
    this.scene.add(this.clouds);
  }

  /**
   * Draw globe and start animation
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.control.update();
    this.clouds.rotation.y += 0.0002;
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * This component will append canvas element inside here.
   */
  render() {
    return (
      <div ref={(node) => this.el = node} className="c-globe"></div>
    );
  }

}

Globe.defaultProps = {
  autorotate: false,
  velocity: 0.05,
  width: window.innerWidth,
  height: window.innerHeight,
  radius: (window.innerHeight / 2) * 0.8,
  earthImage: earthImage,
  earthBumpImage: earthBumpImage,
};

Globe.propTypes = {
  // Enable auto rotation and set velocity
  autorotate: React.PropTypes.bool,
  velocity: React.PropTypes.number,

  // Size
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  radius: React.PropTypes.number,

  // Basemaps
  earthImage: React.PropTypes.string,
  earthBumpImage: React.PropTypes.string,
};

export default Globe;
