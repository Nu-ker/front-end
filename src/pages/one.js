import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ImageBackground, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import * as Animatable from 'react-native-animatable';

export default class One extends Component {
  constructor () {
    super()
    this.state = {
      tanggal: moment().format('MMMM DD, YYYY')
    }
  }

  back () {
    const dataBack = new Date(this.state.tanggal).getTime() - 86400000;
    const fixDataBack = moment(dataBack).format('MMMM DD, YYYY')
    this.setState({
      tanggal: fixDataBack
    })
  }

  forward () {
    const dataForward = new Date(this.state.tanggal).getTime() + 86400000;
    const fixDataForward = moment(dataForward).format('MMMM DD, YYYY')
    this.setState({
      tanggal: fixDataForward
    })
  }

  static navigationOptions = {
    title: 'Back',
    tabBarLabel: 'Dashboard',
    header: null,
    tabBarIcon: ({ tintColor }) =>
      <Icon name="home" size={30} color={tintColor}/>
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style={styles.one}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => this.back()}>
              <Ionicons style={{textAlign: 'right'}} name="ios-arrow-back-outline" color="white" size={40}></Ionicons>
            </TouchableOpacity>
          </View>

          <View style={styles.date}>
              <Text style={{fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 18, marginTop: 8}}>
                <Animatable.Text animation="flipInX">
                  {this.state.tanggal}
                </Animatable.Text>
              </Text>
          </View>

          <View style={styles.right}>
            <TouchableOpacity onPress={() => this.forward()}>
              <Ionicons style={{textAlign: 'left'}} name="ios-arrow-forward-outline" color="white" size={40}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.two}>
          <View style={styles.wrapper}>
            <View style={styles.wrapperIn}>
              <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
              <Text style={styles.calory}>2000</Text>
              </Animatable.Text>
              <Text style={styles.caloryRemaining}>Calories Remaining</Text>
            </View>
          </View>
        </View>

        <ScrollView style={{backgroundColor: 'white', margin: 7, width: '97%'}}>
          <Text style={styles.today}>Today's Consumption</Text>
          <View style={styles.three}>
            <TouchableOpacity style={{width: '33%', padding: 5}} onPress={() => navigate('detail')}>
              <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                <Text style={styles.textImage}>50 Kcal</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '33%', padding: 5}} onPress={() => navigate('detail')}>
              <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                <Text style={styles.textImage}>50 Kcal</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '33%', padding: 5}} onPress={() => navigate('detail')}>
              <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                <Text style={styles.textImage}>150 Kcal</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '33%', padding: 5}} onPress={() => navigate('detail')}>
              <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                <Text style={styles.textImage}>20 Kcal</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '33%', padding: 5}} onPress={() => navigate('detail')}>
              <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                <Text style={styles.textImage}>60 Kcal</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '33%', padding: 5}} onPress={() => navigate('detail')}>
              <ImageBackground style={styles.pic} source={{uri : 'https://www.goodindonesianfood.com/story/file/2017/02/Makassar-classic-Warung-Pangkep-Sop-Saudara-1-1170x780.jpg'}}>
                <Text style={styles.textImage}>70 Kcal</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  one: {
    width: '100%',
    flex: 0.3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#302c28',
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    justifyContent: 'center'
  },
  two: {
    backgroundColor: '#6dbbff',
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  three: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dash: {
    height: '100%',
    width: '100%'
  },
  calory: {
    color: '#00173d',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  caloryRemaining: {
    color: '#00173d',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  wrapper: {
    width: '50%',
    height: '70%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 100,
    alignSelf: 'center'
  },
  wrapperIn: {
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#ffc311',
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    borderWidth: 6
  },
  pic: {
    width: '100%',
    height: 100,
    margin: 2
  },
  textImage: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold'
  },
  today: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
    margin: 5,
    fontSize: 20
  },
  left: {
    marginTop: 30,
    width: 50,
    height: 50
  },
  date: {
    marginTop: 30,
    width: '70%',
    height: 50
  },
  right: {
    marginTop: 30,
    width: 50,
    height: 50
  }
})
