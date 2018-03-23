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
    tabBarIcon: ({ tintColor }) =>
      <Icon name="home" size={30} color={tintColor} />
  }
  render() {
    const { food } = this.props.navigation.state.params
    return (
      <View style={styles.container}>

        <View style={styles.food}>
          <ImageBackground style={{width: '100%', height: '100%'}} source={{uri : food[1].photoUrl}}>
          </ImageBackground>
        </View>

        <View style={styles.detail}>
          <View style={{backgroundColor: 'white', margin: 5, width: '97%', height: '100%', alignSelf: 'center'}}>
            <Text style={styles.details}>Details</Text>
            <Text>{JSON.stringify(food[1])}</Text>
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
