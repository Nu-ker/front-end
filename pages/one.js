import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

export default class One extends Component {
  static navigationOptions = {
    title: 'One',
    tabBarLabel: 'One',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="shopping-basket" size={30} color={tintColor} />
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="click to go to One #2"
        onPress={() => navigate('onea')}
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
