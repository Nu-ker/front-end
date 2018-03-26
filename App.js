console.disableYellowBox = true
import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider } from "react-redux";
import store from "./src/store/index";
import Loading from "./src/components/Loading"
export default class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
    <Provider store={store}>
      <Loading/>
    </Provider>
    )
  }
}
