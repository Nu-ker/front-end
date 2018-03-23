import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Home from './src/components/Home'
import Form from './src/components/Form'
import DashBoard from './src/components/DashBoard'
import { StackNavigator } from 'react-navigation'
import { Provider } from "react-redux";
import store from "./src/store/index";
export default class App extends React.Component {
  constructor() {
    super()
    this.state={
      uid:false
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('uid',(err,result)=>{
      if(result){
        this.setState({
          uid:true
        })
      }
    })
  }
  render() {
    if(this.state.uid){
        return (
        <Provider store={store}>
          <NaviD/>
        </Provider>
        )
    }else{
      return (
        <Provider store={store}>
          <Navi/>
        </Provider>
      )
    }
  }
}

const Navi = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Form: {
    screen: Form,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000d1a'
      }
    }
  },
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      header: null
    }
  }
})
const NaviD = StackNavigator({
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      header: null
    }
  }
})
