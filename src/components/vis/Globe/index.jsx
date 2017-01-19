import React from 'react';
import * as THREE from 'three';
import orbitControl from './control';
import earthImage from './images/earth-clouds.jpg';
import earthBumpImage from './images/earth-bump.jpg';
import './style.scss';

// import customData from './assets/data.json';

// import animaliaImage from './images/globe/animmalia-2.jpg';
// import protectedImage from './images/globe/protected-areas-2.jpg';
// import ecoImage from './images/globe/eco-regions.jpg';
// import earthBumpImage from './images/earth-bump.jpg';
// import { latLongToVector3, addStats } from './utils';

// const markersShow = false;

// const imageTexture = earthImage;

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

    // Appending canvas
    this.el.appendChild(this.renderer.domElement);
  }

  /**
   * Add lights to scene
   */
  addLights() {
    const ambientLight = new THREE.AmbientLight(0x444444); // Soft white light
    this.pointLight = new THREE.PointLight(0xf6f6f6, 1);

    // TODO: translate point of light
    // this.pointLight.position.set(-this.props.width / 2, this.props.height / 2, 1000);

    this.scene.add(ambientLight);
    this.scene.add(this.pointLight);
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
    const geometry = new THREE.SphereGeometry(this.props.radius, 40, 30);
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
    window.control = this.control
  }

  /**
   * Draw globe and start animation
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    this.pointLight.position.copy(this.camera.position);
    this.control.update();
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

  // componentDidMount() {
  //   this.state = {
  //     scrollTop: this.props.scrollTop,
  //     markers: false,
  //     texture: false
  //   };

  //   this.imageTexture = earthImage;
  //   this.markersShow = false;

  //   const width = this.props.width;
  //   const height = this.props.height;

  //   const fov = 45;
  //   const near = 1;
  //   const far = 1500;

  //   this.scene = new THREE.Scene();
  //   this.imageLoader = new THREE.TextureLoader();
  //   this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
  //   this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  //   this.camera.position.z = (far / 2) * 0.90;
  //   this.renderer.setSize(width, height);

  //   // Appending to DOM
  //   this.el.appendChild(this.renderer.domElement);

  //   this.addControls();
  //   this.addLights();
  //   this.addGlobe();
  //   this.addMarkers();

  //   this.draw();

  //   // Adding frame stats for development
  //   if (config.env === 'development') {
  //     addStats();
  //   }

  //   // On scroll event
  //   if (this.props.scrollRotate) {
  //     let lastScrollTop = 0;
  //     window.addEventListener('scroll', function(e) {
  //       const st = window.pageYOffset || document.documentElement.scrollTop;
  //       if (st > lastScrollTop) {
  //         this.rotateX(1);
  //       } else {
  //         this.rotateX(-1);
  //       }
  //       lastScrollTop = st;
  //     }.bind(this));
  //   }

  //   // On click event
  //   const raycaster = new THREE.Raycaster();
  //   const mouse = new THREE.Vector2();

  //   document.addEventListener('click', function(event) {
  //     event.preventDefault();

  //     mouse.x = (event.offsetX / this.renderer.domElement.clientWidth) * 2 - 1;
  //     mouse.y = - (event.offsetY / this.renderer.domElement.clientHeight) * 2 + 1;

  //     this.camera.updateMatrixWorld();
  //     raycaster.setFromCamera( mouse, this.camera );

  //     const intersects = raycaster.intersectObjects( this.scene.children );

  //     if (intersects && intersects.length > 1) {
  //       const userData = intersects[0].object.data;
  //       this.showmodal(userData.Region, userData.Description, userData.ID);
  //     }
  //   }.bind(this), false);
  // }

  // componentWillReceiveProps(nextProps) {
  //   const interactive = document.querySelector('.c-interactive-world-section');
  //   const galeryOne = document.querySelector('.c-gallery-one-section');
  //   const galeryTwo = document.querySelector('.c-gallery-two-section');
  //   this.setState(
  //     {
  //       scrollTop: nextProps.scrollTop
  //     }
  //   );
  //   const changeWorldOne = galeryOne.offsetTop < this.state.scrollTop;
  //   const changeWorldTwo = galeryTwo.offsetTop < this.state.scrollTop;


  //   if (changeWorldOne && !changeWorldTwo) {
  //     if (this.imageTexture === earthImage) {
  //       this.earth.material.map = this.imageLoader.load(protectedImage);
  //       this.imageTexture = protectedImage;
  //     }
  //   } else {
  //     if (this.imageTexture === protectedImage) {
  //       this.earth.material.map = this.imageLoader.load(earthImage);
  //       this.imageTexture = earthImage;
  //     }
  //   }

  //   if (changeWorldTwo) {
  //     if (this.imageTexture === protectedImage) {
  //       this.earth.material.map = this.imageLoader.load(earthImage);
  //       this.imageTexture = earthImage;
  //     }
  //     this.imageTexture = earthImage;
  //   }

  //   const conditional = interactive.offsetTop < this.state.scrollTop;
  //   if (conditional) {
  //     if (!this.markersShow) {
  //       this.addMarkers();
  //     }
  //     this.markersShow = true;
  //   } else {
  //     this.removeMarkers();
  //     this.markersShow = false;
  //   }
  // }

  // addLights() {
  //   const ambientLight = new THREE.AmbientLight(0x333333);
  //   this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  //   this.directionalLight.position.set(5, 3, 40);
  //   this.scene.add(ambientLight);
  //   this.scene.add(this.directionalLight);
  // }

  // addGlobe() {
  //   const material = new THREE.MeshPhongMaterial({
  //     map: this.imageLoader.load(this.props.earthImage),
  //     bumpMap: this.imageLoader.load(this.props.earthBumpImage),
  //     bumpScale: 2
  //   });
  //   const geometry = new THREE.SphereGeometry(this.props.radius, 40, 30);
  //   const earth = new THREE.Mesh(geometry, material);
  //   earth.updateMatrix();
  //   this.earth = earth;
  //   this.scene.add(earth);
  // }

  // setTexture(e) {
  //   let same = false;
  //   const target = e.target;
  //   if (e.target.classList.contains('-selected')) {
  //     same = true;
  //   }
  //   const checks = document.querySelectorAll('.select-legend');
  //   for (let i = 0; i < checks.length; i++) {
  //     checks[i].classList.remove('-selected');
  //   }
  //   if (!same) {
  //     target.classList.add('-selected');
  //     this.earth.material.map = this.imageLoader.load(target.getAttribute('data-layer'));
  //     this.imageTexture = target.getAttribute('data-layer');
  //   } else {
  //     this.earth.material.map = this.imageLoader.load(earthImage);
  //     this.imageTexture = earthImage;
  //   }

  // }

  // showmodal(title, description, id) {
  //   document.querySelector('.image-modal').style.background = `url(./src/components/Modal/assets/${id}.jpg`;
  //   document.querySelector('.c-modal').style.top = '0';
  //   document.querySelector('.title-modal').innerHTML = title;
  //   document.querySelector('.description-modal').style.left = description;
  // }

  // /**
  //  * Rotate globe to given angle in X axis
  //  * @param  {Number} angle
  //  */
  // rotateX(angle) {
  //   this.control.customRotate(angle);
  // }

  // /**
  //  * Method to add markers on globe
  //  */
  // addMarkers() {
  //   const material = new THREE.MeshBasicMaterial({ color: 0x1bcec7, side: THREE.DoubleSide });
  //   const markers = [];
  //   const markerRadio = 5;
  //   const segments = 64;

  //   for (let i = customData.length - 1; i >= 0; i--) {
  //     // calculate the position
  //     const lat = customData[i].Latitude;
  //     const lng = customData[i].Longtitude;
  //     const radio = this.props.radius;
  //     const height = 5;
  //     const position = latLongToVector3(lat, lng, radio, height);

  //     const geometry = new THREE.CircleGeometry(markerRadio, segments);
  //     const marker = new THREE.Mesh(geometry, material);

  //     marker.position.set(position.x, position.y, position.z);
  //     marker.lookAt(new THREE.Vector3(0, 0, 0));
  //     marker.rotateX(Math.PI);
  //     marker.data = customData[i];

  //     markers.push(marker);
  //     this.scene.add(marker);
  //   }

  //   this.markers = markers;
  // }

  // /**
  //  * Removing markers from globe
  //  */
  // removeMarkers() {
  //   if (this.markers && this.markers.length) {
  //     for (var i = this.markers.length - 1; i >= 0; i--) {
  //       this.scene.remove(this.markers[i]);
  //     }
  //   }
  // }

  // calculateLocations() {
  //   return customData.map((data) => {
  //     // calculate the position
  //     const lat = data.Latitude;
  //     const lng = data.Longtitude;
  //     const radio = this.props.radius;
  //     const height = 6;
  //     const position = latLongToVector3(lat, lng, radio, height);
  //     return Object.assign({}, position);
  //   });
  // }

  // getInfoModal() {
  //   return customData.map((data) => {
  //     return {
  //       id: data.ID,
  //       region: data.Region,
  //       place: data.Places,
  //       description: data.Description
  //     };
  //   });
  // }

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
