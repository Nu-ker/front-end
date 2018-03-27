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
import axios from 'axios'
import Expo from "expo"
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from "react-redux";
import LoadingPage from './LoadingPage'
import { setInitAuth } from '../store/actions/auth'
const androidClientId = "174374570388-iv0u513o3haajik2k3414emc6jquo2at.apps.googleusercontent.com"
const iosClientId= "174374570388-3dvqr4m4n0qau2bh5oamm4bok894qttf.apps.googleusercontent.com"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      loading:false
    }
  }
  signIn = async () => {
    this.setState({
      loading:true
    })
    try {
      console.log('=>>>>> LOGIN')
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId:iosClientId,
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        let user = await axios.get('https://us-central1-nu-ker-fox.cloudfunctions.net/UserLogin',{
          headers:{
            uid: result.user.id
          }
        })
        if(user.data.status){
          AsyncStorage.setItem('uid', result.user.id)
          this.props.setInitAuth()
        }else{
          this.props.navigation.navigate('Form',{
            dataLogin:result.user
          })
        }
        this.setState({
          loading:false
        })
      } else {
        this.setState({
          loading:false
        })
        console.log("cancelled")
      }
    } catch (e) {
      this.setState({
        loading:false
      })
      console.log("error", e)
    }
  }
  render () {
    if(this.state.loading){
      return <LoadingPage/>
    }else{
      return (
        <ImageBackground style={styles.back} source={require('../assets/tes.jpg')}>
          <View>
            <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
            <Text style={styles.figure}>
              An App For Your Health
            </Text>
          </View>
          <View style={styles.container}>
          <TouchableHighlight onPress={() => this.signIn()} style={styles.tombol}>
              <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
                <Text style={styles.text}>
                  Login With Google &nbsp;
                </Text>
                <Ionicons style={styles.icon} name="logo-google" size={15} color="white" />
              </Animatable.Text>
            </TouchableHighlight>
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
    marginTop: 50,
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
const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    setInitAuth
  }, dispatch)
)

export default connect(
  null,
  mapDispacthToProps
)(Home)