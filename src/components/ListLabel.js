import Expo from 'expo';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text, Modal, FlatList, View, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios'
export default class listLabel extends Component {
  constructor () {
    super()
  }

  static navigationOptions = {
    title: 'Preferences',
    tabBarLabel: 'Camera',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="camera-alt" size={30} color={tintColor}/>
  }

  _keyExtractor = (item, index) => item.name

  setModalVisible(item) {
    console.log(item);
    let self = this
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',{
      query: item
    },{
      headers:{
        'x-app-id':'65e7cf5f',
        'x-app-key':'8327635971af5a6dfa8b3c522510e97d'
      }
    })
    .then(({data})=>{
      let food = data.foods[0]
      self.props.navigation.navigate('ArThree',{
        nutritions: {
          name: item,
          calories: food.nf_calories || 0,
          cholesterol:food.nf_cholesterol|| 0,
          total_fat:food.nf_total_fat||0,
          saturated_fa:food.nf_saturated_fat||0,
          total_carbohydrate:food.nf_total_carbohydrate||0,
          sugars:food.nf_sugars||0,
          protein:food.nf_protein||0
        },
        base64: self.props.navigation.state.params.base64
      })
    })
    .catch(err=>{
      console.warn('ERR');
      console.log(err);
    })
  }

  render () {
    const { lists } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 8, borderBottomColor: 'grey', borderBottomWidth: 1}}>Choose Your Preference</Text>
        <FlatList
          style={{width: '100%'}}
          keyExtractor = {this._keyExtractor}
          data={lists}
          renderItem={({item}) =>

          <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
            <TouchableOpacity style={styles.tombol} onPress={() => { this.setModalVisible(item.description) }}>
              <Text style={styles.text}>
                <Ionicons name="ios-restaurant" size={25}></Ionicons>
                &nbsp;&nbsp;&nbsp;
                {item.description}
              </Text>
            </TouchableOpacity>
          </View>

        }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  tombol: {
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    width: '95%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  list: {
    justifyContent: 'center',
    marginTop: 30
  },
  listText: {
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tombolModal: {
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    backgroundColor: 'lightblue'
  }
})
