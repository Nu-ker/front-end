console.disableYellowBox = true
console.disableYellowBox = true
import React from 'react';
import { findNodeHandle, NativeModules, Platform } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import AssetUtils from 'expo-asset-utils';

export default class AR extends React.Component {
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
    // Start AR session
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
    //================================================//

    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(0.17, 0.07, 0.07),
    //   new THREE.MeshBasicMaterial({
    //     map: await ExpoTHREE.createTextureAsync({
    //       asset: Expo.Asset.fromModule(require('../assets/sample.jpg'))
    //     }),
    //   })
    // );

    var image = new Image();
    image.src = "data:image/jpeg;base64";

    var texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () {
      texture.needsUpdate = true;
    };
    var material = new THREE.MeshLambertMaterial({ color: 0x00aa00, map: texture });
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = new THREE.Mesh(geometry, material);

    //================================================//
    // add to scene
    scene.add(cube);
    cube.position.z = -0.4;

    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x333333));
    var keyLight = new THREE.PointLight(0xaaaaaa);
    keyLight.position.x = 15;
    keyLight.position.y = -10;
    keyLight.position.z = 35;
    scene.add(keyLight);

    var rimLight = new THREE.PointLight(0x888888);
    rimLight.position.x = 100;
    rimLight.position.y = 100;
    rimLight.position.z = -50;
    scene.add(rimLight);

    camera.position.z = 2;

    // Main loop
    const render = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      gl.endFrameEXP();
      requestAnimationFrame(render);
      renderer.render(scene, camera);      
    };
    render();
  };
}

