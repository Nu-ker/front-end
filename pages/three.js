import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';


export default class Three extends Component {
  static navigationOptions = {
    title: 'Three',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="list" size={30} />
      
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="click to go to Three #2"
        onPress={() => navigate('threea')}
      />
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
});
