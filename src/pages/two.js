import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Camera from '../components/camera'
// import Camera from '../components/ArThree'

export default class Two extends Component {
  static navigationOptions = {
    title: 'Two',
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
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Camera />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: "#f4511e",
    paddingRight: 10,
    paddingLeft: 10
  },
});
