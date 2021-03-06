import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from "react-redux";
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment'
import * as Animatable from 'react-native-animatable';
import { db } from '../firebase'
import { setInitAuth } from '../store/actions/auth'
import axios from 'axios'
import ProgressCircle from 'react-native-progress-circle'
import LoadingPage from '../components/LoadingPage'
import ErrorPage from '../components/ErrorPage'

class One extends Component {
  constructor () {
    super()
    this.state = {
      tanggal: moment().format('MMMM-DD-YYYY')
    }
  }
  componentWillMount = async ()=>{
    let self = this
    AsyncStorage.getItem('uid',(err,result)=>{
      const sample =axios.get('https://us-central1-nu-ker-fox.cloudfunctions.net/DateCheck',{
        headers: {
          uid: result,
          date: moment().format('MMMM-DD-YYYY')
        }
      })
    })
  }

  back () {
    const dataBack = new Date(this.state.tanggal).getTime() - 86400000;
    const fixDataBack = moment(dataBack).format('MMMM-DD-YYYY')
    this.setState({
      tanggal: fixDataBack
    })
  }

  forward () {
    const dataForward = new Date(this.state.tanggal).getTime() + 86400000;
    const fixDataForward = moment(dataForward).format('MMMM-DD-YYYY')
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
  render () {
    const { loading , error , data } = this.props.stateNucare
    const { navigate } = this.props.navigation;

    if(!data){
      return <LoadingPage/>
    }else if(error){
      return <ErrorPage error={error}/>
    }else{
      if(data.dates[this.state.tanggal]){
    return (
      <View style={styles.container}>
        <View style={styles.one}>
          <View style={styles.left}>
            <TouchableOpacity
            disabled={Object.keys(data.dates)[0] === this.state.tanggal}
            onPress={() => this.back()}>
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
            <TouchableOpacity
            disabled={moment().format('MMMM-DD-YYYY') === this.state.tanggal}
            onPress={() => this.forward()}>
              <Ionicons style={{textAlign: 'left'}} name="ios-arrow-forward-outline" color="white" size={40}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.two}>
          <ProgressCircle
              percent={(data.dates[this.state.tanggal])?((Number(data.dates[this.state.tanggal].calories)/Number(data.calories))*100):''}
              radius={100}
              borderWidth={10}
              color="#3399FF"
              shadowColor="white"
              bgColor="lightblue"
          >
          <Text style={styles.calory}>{(data.dates[this.state.tanggal])?(data.dates[this.state.tanggal]).calories:''}</Text>
          <Text style={styles.caloryRemaining}>Calory Remaining</Text>
        </ProgressCircle>
        </View>

        <ScrollView style={{backgroundColor: 'white', margin: 7, width: '97%'}}>
          <Text style={styles.today}>Today's Consumption</Text>
          <View style={styles.three}>
          {
            data.dates[this.state.tanggal].foods?
            Object.entries(data.dates[this.state.tanggal].foods).map((key,i)=>(
              <TouchableOpacity
              key={i}
              style={{width: '33%', padding: 5}}
              onPress={() => navigate('detail',{
                food: key,
                date: this.state.tanggal
              })}>
                <Animatable.View animation="bounceIn">
                  <View>
                    <ImageBackground style={styles.pic} source={{uri : `data:image/jpg;base64,${key[1].photoUrl}`}}>
                      <Text style={styles.textImage}>{key[1].calories} Kcal</Text>
                    </ImageBackground>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            )):<Text></Text>
          }
          </View>
        </ScrollView>
      </View>
    )
  }else{
    return <LoadingPage/>
  }
  }
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
    backgroundColor: '#a0d1ff',
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  three: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    width: 200,
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 200/2,
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
const mapStateToProps = (state, props) => ({
  stateNucare: state.Nucare,
  stateAuth: state.Auth
})
const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    setInitAuth
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(One)
