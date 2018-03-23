import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import One from '../pages/one';
import Onea from '../pages/onea';
import Two from '../pages/two';
import Three from '../pages/three';
import detail from '../pages/detail';

export default class Router extends Component {
  render() {
    const Footer = TabNavigator({
      one: {
        screen: StackNavigator({
          one: { screen: One },
          detail: { screen: detail }
        })
      },
      two: {
        screen: StackNavigator({
          two: { screen: Two },
        })
      },
      three: {
        screen: StackNavigator({
          three: { screen: Three },
        })
      }
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 10 }
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <Footer />
      </View>
    );
  }
}