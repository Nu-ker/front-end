import React from 'react';
import { StyleSheet, Text, ImageBackground, TouchableHighlight, View, Image, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Home extends React.Component {
  gender () {
    console.warn('wohooo');
  }

  render () {
    var male = [
      {label: 'Male', value: 0 }
    ]

    var female = [
      {label: 'Female', value: 1 }
    ]

    return (
      <ImageBackground style={styles.back} source={{uri: `http://www.designbolts.com/wp-content/uploads/2016/07/Mountains-iPhone-6-Wallpaper.jpg`}}>
        <Text style={styles.judul}>Please Fill The Form</Text>
        <View>
          <Text style={styles.male}>Male</Text>
          <Text style={styles.female}>Female</Text>
        </View>
        <View style={styles.wrap}>
          <TextInput placeholder="Your Age" style={styles.input}></TextInput>
          <TextInput placeholder="Your Gender" style={styles.input}></TextInput>
          <TextInput placeholder="Your Weight" style={styles.input}></TextInput>
          <TextInput placeholder="Your Height" style={styles.input}></TextInput>
        </View>
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
    borderWidth: 1,
    width: '90%',
    height: 40,
    margin: 6,
    padding: 7,
    backgroundColor: 'white'
  },
  wrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  judul: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30
  },
  gender: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
