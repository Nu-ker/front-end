import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import Home from './src/components/Home'
import Form from './src/components/Form'
import DashBoard from './src/components/DashBoard'
import { StackNavigator } from 'react-navigation'

export default class App extends React.Component {
  render() {
    return (
      <Navi/>
    )
  }
}

const Navi = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Form: {
    screen: Form,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000d1a'
      }
    }
  },
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      header: null
    }
  }
})
