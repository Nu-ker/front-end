import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

export default class EditProfile extends Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="person" size={30} color={tintColor}/>
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, textAlign: 'center', marginTop: 15, fontWeight: 'bold', letterSpacing: 1}}>Edit Your Profile</Text>
        <TextInput placeholder="Your Weight (kg)" keyboardType="default" style={styles.input}></TextInput>
        <TextInput placeholder="Your Height (cm)" keyboardType="default" style={styles.input}></TextInput>
        <TextInput placeholder="Your Gender" keyboardType="default" style={styles.input}></TextInput>
        <TextInput placeholder="Your Age" keyboardType="default" style={styles.input}></TextInput>
        <TextInput placeholder="Weight Target" keyboardType="default" style={styles.input}></TextInput>
          <TouchableOpacity  style={styles.next}>
            <Text style={styles.text}>NEXT</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'azure'
  },
  input: {
    alignSelf: 'center',
    borderWidth: 1,
    width: '90%',
    height: 40,
    margin: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  next: {
    backgroundColor: 'lightblue',
    width: '90%',
    height: 35,
    marginTop: 10,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 5,
    textAlign: 'center'
  }
})
