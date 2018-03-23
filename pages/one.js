import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableHighlight, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

export default class One extends Component {
  constructor () {
    super()
    this.state = {
      image: [
        {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'},
        {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'},
        {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'},
        {url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'}
      ]
    }
  }
  static navigationOptions = {
    title: 'One',
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
            <Ionicons name="ios-arrow-dropleft-circle-outline" style={{fontWeight: 'bold'}} size={25} color="white"/>
            &nbsp;
            Monday, March 18
            &nbsp;
            <Ionicons name="ios-arrow-dropright-circle-outline" style={{fontWeight: 'bold'}} size={25} color="white"/>
          </Text>

          <View style={styles.wrapper}>
            <View style={styles.wrapperIn}>
              <Text style={styles.calory}>2000</Text>
              <Text style={styles.caloryRemaining}>Calories Remaining</Text>
            </View>
          </View>

        </View>

        <View style={styles.two}>
          <ScrollView>
          </ScrollView>
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
    width: '100%'
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
  }
})
