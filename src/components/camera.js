import Expo from 'expo';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
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
      <View style={styles.container}>
        {imageView}
        {labelView}
        <Ionicons name="ios-image-outline" size={120} color="black"></Ionicons>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}
          onPress={this._pickImage}>
          <Text>Take A Picture</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _pickImage = async () => {
    const {
      cancelled,
      uri,
      base64,
    } = await Expo.ImagePicker.launchCameraAsync({
      base64: true,
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
    console.log('tessss',parsed)
    this.setState({
      label: parsed.responses[0].labelAnnotations[1].description,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
