import React from 'react';
import { StyleSheet, Text, ScrollView, ImageBackground, TouchableHighlight, View, Image, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Home extends React.Component {
  componentWillMount(){
    console.log(this.props.navigation.state.params.dataLogin);
  }
  render () {
    return (
      <ImageBackground style={styles.back} source={require('../assets/tes.jpg')}>
        <Text style={styles.judul}>Please Fill The Form</Text>
        <ScrollView style={styles.wrap}>
          <TextInput placeholder="Your Weight (kg)" keyboardType="default" style={styles.input}></TextInput>
          <TextInput placeholder="Your Height (cm)" keyboardType="default" style={styles.input}></TextInput>
          <TextInput placeholder="Your Gender" keyboardType="default" style={styles.input}></TextInput>
          <TextInput placeholder="Your Age" keyboardType="default" style={styles.input}></TextInput>
          <TextInput placeholder="Weight Target" keyboardType="default" style={styles.input}></TextInput>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('DashBoard')} style={styles.next}>
            <Text style={styles.text}>NEXT</Text>
          </TouchableHighlight>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    height: '100%'
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
  wrap: {
    width: '100%',
    height: '100%',
  },
  judul: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30
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
