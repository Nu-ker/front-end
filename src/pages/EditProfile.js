import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Picker, TouchableHighlight, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import {Select, Option} from "react-native-chooser";
import * as Animatable from 'react-native-animatable';

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state={
      weight:props.navigation.state.params.user.weight,
      height:props.navigation.state.params.user.height,
      age:props.navigation.state.params.user.age,
      sex:props.navigation.state.params.user.sex,
      activity:props.navigation.state.params.user.activity,
      value: "Select Gender",
      valueActivity: 'Activity'
    }
  }

  onSelectGender(value, label) {
    this.setState({
      ...this.state,
      value: label,
      sex : value
    });
  }

  onSelectActivity(value, label) {
    this.setState({
      ...this.state,
      activity: value,
      valueActivity: label
    })
  }

  static navigationOptions = {
    title: 'Edit Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="person" size={30} color={tintColor}/>
  }

  handleSubmit= async ()=>{
    let self = this
    AsyncStorage.getItem('uid',(err,result)=>{
      if(result){
        axios.put('https://us-central1-nu-ker-fox.cloudfunctions.net/User',{
        photoUrl:self.props.navigation.state.params.user.photoUrl,
        email:self.props.navigation.state.params.user.email,
        name: self.props.navigation.state.params.user.name,
        weight: self.state.weight,
        height: self.state.height,
        age: self.state.age,
        sex: self.state.sex,
        activity: self.state.activity,
      },{
        headers:{
          uid:result
        }
      })
      .then(()=>{
        this.props.navigation.goBack()
      })
      .catch(err=>{
        console.log(err);
      })
      }
  })
  }

  componentWillMount () {
    if (this.state.activity === '1.9') {
      this.setState({
        ...this.state,
        valueActivity: 'Extreme'
      })
    } else if (this.state.activity === '1.725') {
      this.setState({
        ...this.state,
        valueActivity: 'Very Active'
      })
    } else if (this.state.activity === '1.55') {
      this.setState({
        ...this.state,
        valueActivity: 'Active'
      })
    } else if (this.state.activity === '1.375') {
      this.setState({
        ...this.state,
        valueActivity: 'Lightly'
      })
    } else if (this.state.activity === '1.2') {
      this.setState({
        ...this.state,
        valueActivity: 'Sedentary'
      })
    }
  }

  render () {
    return (
      <ScrollView style={styles.wrap}>
          <TextInput keyboardType="phone-pad" placeholder="Your age" style={styles.input}
          onChangeText={(age) => this.setState({
            ...this.state,
            age
          })}
          value={this.state.age}/>
        <TextInput keyboardType="phone-pad" placeholder="Your Weight (kg)" style={styles.input}
          onChangeText={(weight) => this.setState({
            ...this.state,
            weight
          })}
          value={this.state.weight}/>
        <TextInput keyboardType="phone-pad" placeholder="Your Height (cm)" style={styles.input}
          onChangeText={(height) => this.setState({
            ...this.state,
            height
          })}
          value={this.state.height}/>

          <Select
            animationType="slide"
            onSelect = {this.onSelectGender.bind(this)}
            defaultText={this.state.sex}
            textStyle={{color: 'black'}}
            style = {{margin: 8, padding: 10, width: '90%', alignSelf: 'center', borderBottomWidth: 1}}
            transparent={true}
            indicator="down"
            indicatorColor="black"
            optionListStyle = {{backgroundColor : "rgba(0, 0, 0, 0.8)", height: 80, width: '90%'}}
          >
            <Option styleText={{color: 'white'}} value={"Male"}>Male</Option>
            <Option styleText={{color: 'white'}} value={"Female"}>Female</Option>
          </Select>

          <Select
            animationType="slide"
            onSelect = {this.onSelectActivity.bind(this)}
            defaultText={this.state.valueActivity}
            textStyle={{color: 'black'}}
            style = {{margin: 8, padding: 10, width: '90%', alignSelf: 'center', borderBottomWidth: 1}}
            transparent={true}
            indicator="down"
            indicatorColor="black"
            optionListStyle = {{backgroundColor : "rgba(0, 0, 0, 0.8)", height: 200, width: '90%'}}
          >
            <Option styleText={{color: 'white'}} value={"1.2"}>Sedentary</Option>
            <Option styleText={{color: 'white'}} value={"1.375"}>Lightly</Option>
            <Option styleText={{color: 'white'}} value={"1.55"}>Active</Option>
            <Option styleText={{color: 'white'}} value={"1.725"}>Very Active</Option>
            <Option styleText={{color: 'white'}} value={"1.9"}>Extreme</Option>
          </Select>

          <TouchableHighlight onPress={() => this.handleSubmit()} style={styles.next}>
            <Text style={styles.text}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'azure'
  },
  input: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
    margin: 8,
    padding: 10
  },
  next: {
    backgroundColor: 'lightblue',
    width: '90%',
    height: 35,
    marginTop: 10,
    alignSelf: 'center'
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 5,
    textAlign: 'center'
  }
})