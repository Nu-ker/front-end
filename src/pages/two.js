import React, { Component } from 'react';
import Expo from 'expo';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Camera from '../components/camera'
import { storage } from "../firebase";
export default class Two extends Component {
  constructor() {
    super()
    this.state={
      loading:false,
      uid:null
    }
  }

  static navigationOptions = {
    title: 'Back',
    header: null,
    tabBarLabel: 'Camera',
    headerTitleStyle: {
      flex: 1,
      fontWeight: "bold",
      textAlign: "center",
      alignSelf: 'center',
    },

    tabBarIcon: ({ tintColor }) =>
      <Icon name="camera-alt" size={30} color={tintColor} />
  }

  componentWillMount(){
    let self = this
    AsyncStorage.getItem('uid',(err,result)=>{
      if(err){
        console.log('err=>>',err);
      }else{
        self.setState({
          ...self.state,
          uid:result
        })
      }
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/cmr.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          {(!this.state.loading)?(
          <View style={styles.container}>
            <Ionicons name="ios-image-outline" size={120} color="black"></Ionicons>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5 }}
              onPress={this._pickImage}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Take A Picture</Text>
            </TouchableOpacity>
          </View>
          ): (
          <ActivityIndicator size="large" color="#424242" />
          ) }
        </View>
      </ImageBackground>
    );
  }
  _pickImage = async () => {
    const {
      cancelled,
      uri,
      base64
    } = await Expo.ImagePicker.launchCameraAsync({
      base64: true,
      quality : 0.3,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if(!cancelled){
      this.setState({
        ...this.state,
        loading:true
      })
    }
    const body = {
      requests:[
        {
          image:{
            content: base64,
          },
          features:[
            {
              type: 'LABEL_DETECTION',
            }
          ]
        },
      ],
    };

    const key = 'AIzaSyBIfaUsi0tnYkY4sc7SpS0-BduLIP1Nms8';
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parsed = await response.json();
    const data = parsed.responses[0].labelAnnotations
    this.setState({
      ...this.state,
      loading:false
    })
    this.props.navigation.navigate('ListLabel',{
      lists : data,
      base64 : base64,
      uid: this.state.uid,
      uri:uri
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: "#f4511e",
    paddingRight: 10,
    paddingLeft: 10
  },
});
