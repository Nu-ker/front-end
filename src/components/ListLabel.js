import Expo from 'expo';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text, Modal, FlatList, View, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native';

export default class listLabel extends Component {
  constructor () {
    super()
    this.state = {
      modalVisible: false,
      dummy: [
        {name: 'Steak'},
        {name: 'Satay'},
        {name: 'Meat'},
        {name: 'Beef'},
        {name: 'Wagyu'},
        {name: 'Tenderloin'},
        {name: 'Pork'},
        {name: 'Pork Ribs'},
        {name: 'Sirloin'},
        {name: 'Sheep'}
      ]
    }
  }

  _keyExtractor = (item, index) => item.name

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    })
  }

  render () {
    return (
      <View style={styles.container}>

        <Modal animationType="fade" transparent={false} visible={this.state.modalVisible} onRequestClose={() => { alert('Modal has been closed.') }}>
          <View style={styles.list}>
            <Text style={styles.listText}>Calorie : 50</Text>
            <Text style={styles.listText}>Nutrition : 100</Text>
            <Text style={styles.listText}>Fat: 233</Text>
          </View>

          <TouchableOpacity style={styles.tombolModal} onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
            <Text style={{textAlign: 'center'}}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('DashBoard')
          }} style={styles.tombolModal}>
            <Text style={{textAlign: 'center'}}>Continue</Text>
          </TouchableOpacity>

        </Modal>

        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 10}}>Choose Your Food</Text>
        <FlatList
          style={{width: '100%'}}
          keyExtractor = {this._keyExtractor}
          data={this.state.dummy}
          renderItem={({item}) =>

          <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
            <TouchableOpacity style={styles.tombol} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
              <Text style={styles.text}>
                <Ionicons name="ios-restaurant" size={25}></Ionicons>
                &nbsp;&nbsp;&nbsp;
                {item.name}
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
