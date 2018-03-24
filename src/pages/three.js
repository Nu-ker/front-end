import React, { Component } from 'react';
import { View, TouchableOpacity, AsyncStorage, ImageBackground, Text, StyleSheet, Button } from 'react-native';
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
        <ImageBackground source={{uri : data.photoUrl}} style={styles.profilePicture}>
          <View style={styles.circle}>
            <Ionicons name="md-person" size={110} style={{alignSelf: 'center', margin: 12}} color="azure"></Ionicons>
          </View>
        </ImageBackground>

        <View style={styles.profileDetail}>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Name :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.name}
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Age :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.age}
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              E-mail :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.email}
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Weight :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.weight} kg
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Height :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.height} cm
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Activity :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.activity}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.logout()} style={{ alignSelf: 'center', marginTop: 15, padding: 10, backgroundColor: 'lightblue', borderRadius: 5, width: '96%' }}>
            <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>LogOut</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('EditProfile',{
            user: data
          })} style={{ alignSelf: 'center', marginTop: 15, padding: 10, backgroundColor: 'lightblue', borderRadius: 5, width: '96%' }}>
            <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>Edit Profile</Text>
          </TouchableOpacity>
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
    backgroundColor: 'azure',
    width: '100%',
    flexDirection: 'column'
  },
  circle: {
    margin: 12,
    alignSelf: 'center',
    width: '42%',
    height: '85%',
    backgroundColor: 'lightblue',
    borderRadius: 100
  },
  bio: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxHeight: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1
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