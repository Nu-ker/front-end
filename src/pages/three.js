import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class Three extends Component {
  static navigationOptions = {
    title: 'Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="person" size={30} color={tintColor}/>
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <ImageBackground source={{uri : 'https://i.pinimg.com/originals/24/fb/c2/24fbc25e1c64ffcac48baf3c50e8c61f.jpg'}} style={styles.profilePicture}>
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
              Arief Tri Munandar
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Age :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              23
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              E-mail :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              arief@gmail.com
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Weight :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              56 kg
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Height :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              170 cm
            </Text>
          </View>

          <View style={styles.bio}>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Activity :
            </Text>
            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>
              Hot
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigate('EditProfile')} style={{ alignSelf: 'center', marginTop: 15, padding: 10, backgroundColor: 'lightblue', borderRadius: 5, width: '96%' }}>
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
