import Expo from 'expo';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native';

export default class App extends React.Component {
  state = {
    imageUri: null,
    label: null,
  }

  render() {
    let imageView = null;
    if (this.state.imageUri) {
      imageView = (
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: this.state.imageUri }}
        />
      );
    }

    let labelView = null;
    if (this.state.label) {
      labelView = (
        <Text style={{ padding: 5 }}>
          {this.state.label}
        </Text>
      );
    }

    return (
      <ImageBackground source={require('../assets/cmr.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          {imageView}
          {labelView}
          <Ionicons name="ios-image-outline" size={120} color="black"></Ionicons>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 5 }}
            onPress={this._pickImage}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Take A Picture</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }

  _pickImage = async () => {
    const {
      cancelled,
      uri,
      base64      
    } = await Expo.ImagePicker.launchCameraAsync({
      base64: true,
      quality : 0.1,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!cancelled) {
      this.setState({
        imageUri: uri,
        label: 'loading...',
      });
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
    let arrayOfFood = []
    for( let i in data ){      
      arrayOfFood.push(data[i].description)      
    }

    console.log('tessss',arrayOfFood)
    this.setState({
      label: arrayOfFood.join(', ')
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
