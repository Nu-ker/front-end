console.disableYellowBox = true
import React from 'react';
import { findNodeHandle, NativeModules, Platform, View } from 'react-native';
import ExpoTHREE from 'expo-three';
import * as THREE from 'three';

export default class AR extends React.Component {
  constructor() {
    super()
    // text:{
    //   text:`des 
    //   name:
    //   calories:
    //   total fat:
    //   cholesterol:
    //   total carbohydrate
    //   sugars:
    //   protein:
    //   image url:
    //   `
    // },      
    this.state={
      text:`description
      name:
      calories:
      total fat:
      cholesterol:
      total carbohydrate:
      sugars:
      protein:
      image url:`
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
    // Start AR session
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
    // camera.position.x = 40
    // camera.position.y = 40
    // camera.position.z = 40
         
    // Load font
    const fontJson = require( "../assets/fonts/three_fonts/neue_haas_unica_pro_medium.json" );
    const font = new THREE.Font( fontJson );

    const text = new THREE.Mesh(      
      new THREE.TextGeometry(self.state.text, 
      {                        
        font: font,        
        size: 3, //Size of the text. Default is 100.
        height: 1, //Thickness to extrude text. Default is 50.
        // curveSegments: 12, // — Integer. Number of points on the curves. Default is 12.
        // bevelEnabled: false, // — Boolean. Turn on bevel. Default is False.
        // bevelThickness: 10, // — Float. How deep into text bevel goes. Default is 10.
        // bevelSize: 0.5, // — Float. How far from text outline is bevel. Default is 8.
        // bevelSegments: 0.3, // — Integer. Number of bevel segments. Default is 3.
      }),    
      // new THREE.MeshNormalMaterial({ 
      //   color: 0x000000, specular: 0x000000,opacity: 0.5, transparent: true,overdraw: 0.5
      // })      
    );

    scene.add(text);  
    material = new THREE.MeshBasicMaterial()  
    text.material.color.setHex(0xffffff)
    
    text.position.x = -20;
    text.position.z = -100;
    text.position.y = -5;
    
  
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