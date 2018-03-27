import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage, ImageBackground, Image, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {
  connect
} from "react-redux";
import {
  bindActionCreators
} from 'redux'
import { NavigationActions } from 'react-navigation'
import { logOut } from '../store/actions/auth'
class Three extends Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="person" size={30} color={tintColor}/>
  }
  logout=()=>{
    this.props.logOut()
  }

  render() {
    const { navigate } = this.props.navigation;
    const { data, error, loading } = this.props.stateNucare
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/profileimg.jpg')} style={styles.profilePicture}>
          <Image style={styles.circle} source={{uri: data.photoUrl}}>
          </Image>
        </ImageBackground>

        <View style={styles.profileDetail}>
          <ScrollView style={{backgroundColor: 'white', margin: 5}}>
          <View style={styles.bio}>
            <Text style={styles.desc}>
              Name :
            </Text>
            <Text style={styles.desc}>
              {data.name}
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={styles.desc}>
              Age :
            </Text>
            <Text style={styles.desc}>
              {data.age}
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={styles.desc}>
              E-mail :
            </Text>
            <Text style={styles.desc}>
              {data.email}
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={styles.desc}>
              Weight :
            </Text>
            <Text style={styles.desc}>
              {data.weight} kg
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={styles.desc}>
              Height :
            </Text>
            <Text style={styles.desc}>
              {data.height} cm
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={styles.desc}>
              Activity :
            </Text>
            <Text style={styles.desc}>
              {data.activity}
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigate('EditProfile',{
              user: data
            })} style={styles.tombolEdit}>
            <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.logout()} style={styles.tombolLogout}>
            <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>LogOut</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    flex: 0.5,
    width: '100%'
  },
  profileDetail: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#c9c9c9'
  },
  circle: {
    margin: 12,
    alignSelf: 'center',
    width: '40%',
    height: '85%',
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'white'
  },
  bio: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 50,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  desc: {
    marginLeft: 1,
    fontSize: 18
  },
  tombolEdit: {
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    width: '90%'
  },
  tombolLogout: {
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    width: '90%',
    marginBottom: 10
  }
});

const mapStateToProps = (state, props) => ({
  stateNucare: state.Nucare,
})

const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
      logOut
  }, dispatch)
  )

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Three)
