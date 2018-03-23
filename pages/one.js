import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

export default class One extends Component {
  constructor () {
    super()
  }

  static navigationOptions = {
    title: 'Back',
    tabBarLabel: 'Dashboard',
    header: null,
    tabBarIcon: ({ tintColor }) =>
      <Icon name="home" size={30} color={tintColor}/>
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.one}>

          <Text style={styles.date}>
            <Ionicons name="ios-arrow-back-outline" style={{fontWeight: 'bold'}} size={23} color="white"/>
            &nbsp;&nbsp;
            Monday, March 18
            &nbsp;&nbsp;
            <Ionicons name="ios-arrow-forward-outline" style={{fontWeight: 'bold'}} size={23} color="white"/>
          </Text>

          <View style={styles.wrapper}>
            <View style={styles.wrapperIn}>
              <Text style={styles.calory}>2000</Text>
              <Text style={styles.caloryRemaining}>Calories Remaining</Text>
            </View>
          </View>

        </View>

          <ScrollView style={{backgroundColor: 'white', margin: 7, width: '97%'}}>
            <Text style={styles.today}>Today's Consumption</Text>
            <View style={styles.two}>
              <TouchableOpacity style={{width: '30%'}} onPress={() => navigate('detail')}>
                <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                  <Text style={styles.textImage}>50 Kcal</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>

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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  one: {
    width: '100%',
    flex: 1.5,
    height: '50%',
    backgroundColor: '#6dbbff',
    borderBottomWidth: 5,
    borderBottomColor: 'white'
  },
  two: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  date: {
    color: 'white',
    marginTop: 50,
    marginBottom: 10,
    fontSize: 22,
    textAlign: 'center'
  },
  dash: {
    height: '100%',
    width: '100%'
  },
  calory: {
    color: '#00173d',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  caloryRemaining: {
    color: '#00173d',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  wrapper: {
    width: '50%',
    height: '53%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 100,
    alignSelf: 'center'
  },
  wrapperIn: {
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#ffc311',
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    borderWidth: 6
  },
  pic: {
    width: '100%',
    height: 100,
    margin: 5
  },
  textImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold'
  },
  today: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    margin: 5,
    fontSize: 20
  }
})
