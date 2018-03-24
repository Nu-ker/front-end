import React from 'react';
import { 
  StyleSheet, 
  Text, 
  ImageBackground, 
  TouchableHighlight, 
  View, 
  Image, 
  TextInput, 
  ActivityIndicator, 
  AsyncStorage 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import Expo from "expo"

export default  class Error extends React.Component {
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
            <Text>
                Error : {JSON.stringify(this.props.error)};
            </Text>
          </View>
  
          <Text style={styles.textIcon}>
            <Ionicons name="logo-facebook" size={25} color="white" />
            &nbsp;
       <Ionicons name="logo-twitter" size={25} color="white" />
            &nbsp;
       <Ionicons name="logo-google" size={25} color="white" />
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
    width: '55%',
    padding: 8,
    backgroundColor: '#e54b30',
    borderRadius: 5,
    marginBottom: '5%'
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
  },
  icon: {
    padding: 5
  }
})