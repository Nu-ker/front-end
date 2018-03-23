import Expo from 'expo';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

export default class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
    tabBarLabel: 'Dashboard',
    header: null,
    tabBarIcon: ({ tintColor }) =>
      <Icon name="home" size={30} color={tintColor} />
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.food}>
          <ImageBackground style={{width: '100%', height: '100%'}} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
          </ImageBackground>
        </View>
        <View style={styles.detail}>
          <View style={{backgroundColor: 'white', margin: 5, width: '97%', height: '100%', alignSelf: 'center'}}>
            <Text style={styles.details}>Details</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  food: {
    flex: 1,
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: 'white'
  },
  detail: {
    flex: 1,
    width: '100%'
  },
  details: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    margin: 5,
    fontSize: 20
  }
})
