console.disableYellowBox = true
import React from 'react';
import { findNodeHandle, NativeModules, Platform, View, AsyncStorage, Button } from 'react-native';
import ExpoTHREE from 'expo-three';
import * as THREE from 'three';
import {Icon } from 'react-native-elements'
import { NavigationActions } from "react-navigation";
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
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

  // static navigationOptions = ({ navigation }) => {
  //   const { nutritions , base64 , uid } = navigation.state.params
  //   const name = 'ADD'
  //   return {
  //     title: 'AR',
  //     headerRight:
  //       <Button
  //         title={name}
  //         onPress={ () => {
  //           console.log('base',base64);
  //   console.log('uid',uid);
  //   console.log(nutritions);
  //          axios.post('http://localhost:5000/nu-ker-fox/us-central1/Food',{
  //             'name': nutritions['name'],
  //             'calories': nutritions['calories'],
  //             'total_fat': nutritions['total_fat'],
  //             'saturated_fat': nutritions['saturated_fat'],
  //             'cholesterol':nutritions['cholesterol'],
  //             'total_carbohydrate': nutritions['total_carbohydrate'],
  //             'sugars': nutritions['sugars'],
  //             'protein': nutritions['protein'],
  //             'photoUrl': base64
  //           },{
  //             headers:{
  //               'uid':uid
  //             }
  //           })
  //           .then(({data})=>{
  //             navigation.navigate('two')
  //             console.log(data);
  //           })
  //           .catch(err=>{
  //             console.log('err',err);
  //           })
  //         }
  //         }
  //       />
  //   }
  // }
  static navigationOptions = ({ navigation }) => {
    const { uid, base64, nutritions } = navigation.state.params
    console.log(nutritions);
    const name = 'ADD'
    return {
      title: name,
      headerRight:
        <Button
          title={name}
          onPress={async () => {
              const example = await axios.post('https://us-central1-nu-ker-fox.cloudfunctions.net/Food', {
                'name': nutritions['name'],
                'calories': Math.floor(nutritions['calories']),
                'total_fat': Math.floor(nutritions['total_fat']),
                'saturated_fat': Math.floor(nutritions['saturated_fa']),
                'cholesterol': Math.floor(nutritions['cholesterol']),
                'total_carbohydrate': Math.floor(nutritions['total_carbohydrate']),
                'sugars': Math.floor(nutritions['sugars']),
                'protein': Math.floor(nutritions['protein']),
                'photoUrl': base64
              }, {
                  headers: {
                    uid: uid
                  }
                })
            return navigation.navigate('two')
          }
          }
        />
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
    const { name, calories ,cholesterol, total_fat,saturated_fa, total_carbohydrate, sugars , protein } = this.props.navigation.state.params.nutritions
    var textSample=`description
    name: ${name}
    calories: ${calories}
    total fat: ${total_fat}
    cholesterol: ${cholesterol}
    total carbohydrate: ${total_carbohydrate}
    sugars: ${sugars}
    protein: ${protein}`
    // Load font
    const fontJson = require( "../assets/fonts/three_fonts/neue_haas_unica_pro_medium.json" );
    const font = new THREE.Font( fontJson );

    const text = new THREE.Mesh(      
      new THREE.TextGeometry(textSample, 
      {                        
        font: font,        
        size: 3, //Size of the text. Default is 100.
        height: 1, 
      }),    
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