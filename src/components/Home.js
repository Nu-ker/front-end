import React from 'react';
import { StyleSheet, Text, ImageBackground, TouchableHighlight, View, Image, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends React.Component {
  render () {
    return (
      <ImageBackground style={styles.back} source={require('../assets/tes.jpg')}>

        <View>
          <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
          <Text style={styles.figure}>
            An App For Your Health
          </Text>
        </View>

        <View style={styles.container}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Form')} style={styles.tombol}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
              <Text style={styles.text}>
                Login With Google
                <Image style={{marginLeft: 8,width: 20, height: 20, paddingTop: 30}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google_Plus_logo_2015.svg/600px-Google_Plus_logo_2015.svg.png'}}></Image>
              </Text>
            </Animatable.Text>
          </TouchableHighlight>
        </View>

        <Text style={styles.textIcon}>
          <Ionicons style={styles.icon} name="logo-facebook" size={25} color="white"/>
          <Ionicons style={styles.icon} name="logo-twitter" size={25} color="white"/>
          <Ionicons style={styles.icon} name="logo-google" size={25} color="white"/>
        </Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tombol: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    paddingTop: 5,
    paddingBottom: 11,
    backgroundColor: '#e54b30',
    borderRadius: 5,
    marginBottom: '10%'
  },
  text: {
    letterSpacing: 0.5,
    fontWeight: 'bold',
    color: 'white'
  },
  figure: {
    marginTop: 5,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'white',
    textAlign: 'center'
  },
  logo: {
    marginTop: 30,
    padding: 0,
    alignSelf: 'center'
  },
  textIcon: {
    textAlign: 'center',
    padding: 40,
    marginLeft: 20,
    letterSpacing: 12
  }
})
