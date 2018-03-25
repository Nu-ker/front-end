import React from 'react';
import { findNodeHandle, NativeModules, Platform } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';

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
         
    // Rotating cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.07, 0.07),
      new THREE.MeshBasicMaterial({
        map: await ExpoTHREE.createTextureAsync({
          asset: Expo.Asset.fromModule(require('../assets/icons/app-icon.png')),
        }),
      })
    );   
    cube.position.z = -0.4;
    scene.add(cube);    

    // Main loop
    const render = () => {
      // Rotate cube
      cube.rotation.x += 0.07;
      cube.rotation.y += 0.04;

      // Render scene!
      renderer.render(scene, camera);

      // End and schedule another frame
      gl.endFrameEXP();
      requestAnimationFrame(render);
    };
        

    render();
  };

}


// var loader = new THREE.FontLoader();
    // loader.load( 'https://thefortcity.dev/build/fonts/FontAwesome_Regular.json', function (font) {
    // var textGeometry = new THREE.TextGeometry( "   ", {
    //     font: font,
    //     size: 50,
    //     height: 10,
    //     curveSegments: 12,
    //     bevelThickness: 1,
    //     bevelSize: 1,
    //     bevelEnabled: true
    // });

    // var textMaterial = new THREE.MeshPhongMaterial( 
    //     { color: 0xff0000, specular: 0xffffff }
    // );

    // var mesh = new THREE.Mesh(textGeometry, textMaterial);
    // mesh.position.z = -0.4;
    // scene.add(mesh);
    
    // });   