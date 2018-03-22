import React from 'react';
import { StyleSheet, Text, ImageBackground, TouchableHighlight, View, Image, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Home extends React.Component {
  login () {

  }

  render () {
    return (
      <ImageBackground style={styles.back} source={{uri: `http://www.designbolts.com/wp-content/uploads/2016/07/Mountains-iPhone-6-Wallpaper.jpg`}}>
        <View style={styles.container}>
          <TouchableHighlight onPress={this.login} style={styles.tombol}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
              <Text style={styles.text}>
                Login With Google
                <Image style={{marginLeft: 8,width: 20, height: 20, paddingTop: 30}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google_Plus_logo_2015.svg/600px-Google_Plus_logo_2015.svg.png'}}></Image>
              </Text>
            </Animatable.Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.figure}>An App For Your Health</Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tombol: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    paddingTop: 5,
    paddingBottom: 11,
    backgroundColor: '#e54b30',
    borderRadius: 5
  },
  text: {
    letterSpacing: 0.5,
    fontWeight: 'bold',
    color: 'white'
  },
  figure: {
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40
  }
})
