import ExpoGraphics from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';
import { Platform } from 'react-native';

export default class App extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings(true);
  }
  componentWillUnmount() {
    THREE.suppressExpoWarnings(false);
  }
  onShouldReloadContext = () => {
    /// The Android OS loses gl context on background, so we should reload it.
    return Platform.OS === 'android';
  };

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <ExpoGraphics.View
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
        onShouldReloadContext={this.onShouldReloadContext}
        arEnabled={false}
      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({ gl, canvas, width, height, scale }) => {
    this.renderer = ExpoTHREE.renderer({ gl, canvas });
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 1.0);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const text = "hello world"
    let map;
    if (Platform.OS === 'web') {
      map = require('../assets/icons/app-icon.png');
    } else {
      map = await ExpoTHREE.loadAsync(require('../assets/icons/app-icon.png'));
    }
    const material = new THREE.MeshBasicMaterial({
      // NOTE: How to create an Expo-compatible THREE texture
      map,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  };

  // onResize = ({ width, height, scale }) => {
  //   this.camera.aspect = width / height;
  //   this.camera.updateProjectionMatrix();
  //   this.renderer.setPixelRatio(scale);
  //   this.renderer.setSize(width, height);
  // };

  // onRender = delta => {
  //   this.cube.rotation.x += 3.5 * delta;
  //   this.cube.rotation.y += 2 * delta;
  //   this.renderer.render(this.scene, this.camera);
  // };

  onResize = ({ width, height, scale }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {
    this.scene.rotation.y -= 0.5 * delta;
    this.renderer.render(this.scene, this.camera);
  };

  setupLights = () => {
    let light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(0, 0, -1);
    this.scene.add(light);
    let lighta = new THREE.PointLight(0xffffff, 1.5);
    lighta.position.set(0, 100, 90);
    this.scene.add(lighta);
  };

  
}
