console.disableYellowBox = true
import React from 'react';
import { findNodeHandle, Image, NativeModules, Platform, View, AsyncStorage, Button } from 'react-native';
import ExpoTHREE from 'expo-three';
import * as THREE from 'three';
import {Icon } from 'react-native-elements'
import { NavigationActions } from "react-navigation";
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import AssetUtils from 'expo-asset-utils';
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
      NavigationActions.navigate({routeName: 'two'})
  ]
});
export default class AR extends React.Component {
  constructor() {
    super()
    this.state={
      uid:null
    }
  }

  render() {
    return (
      <Expo.GLView
        nativeRef_EXPERIMENTAL={this._setNativeGLView}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    )
  };

  _setNativeGLView = ref => {
    this._nativeGLView = ref;
  };

  _onGLContextCreate = async gl => {
    var self = this
    const arSession = await NativeModules.ExponentGLViewManager.startARSessionAsync(
      findNodeHandle(this._nativeGLView)
    );

    // Initialize renderer, scene, camera
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000, 1);
    const scene = new THREE.Scene();
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    );
    const remoteImage = 'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg';
    const asset = await AssetUtils.resolveAsync(remoteImage);
    console.log('');
    const { localUri, width, height } = asset;
    console.log('local',localUri);
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.17, 0.07, 0.07),
            new THREE.MeshBasicMaterial({
              map: await ExpoTHREE.createTextureAsync({
                asset: Expo.Asset.fromModule(localUri)
              }),
            })
         );
    scene.add(cube);
    cube.position.z = -0.4


    // Main loop
    const render = () => {
      // Render scene!
      renderer.render(scene, camera);

      // End and schedule another frame
      gl.endFrameEXP();
      requestAnimationFrame(render);
    };
    render();
  };
}
